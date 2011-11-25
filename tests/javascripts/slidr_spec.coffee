# require scripts
require '/jquery-1.7.1.js'
require '/jquery.slidr.js'
require '/jquery.slidr.thumbnails.js'
require '/jquery.slidr.transitions.js'

# settings
describe 'settings', ->
  
  # define var in scope
  slidr =
  
  beforeEach ->
    slidr = new $.slidr $('#example1'), { width: 500, height: 300, thumb_width: 100, thumb_height: 100 }
  
  it 'settings width', ->
    expect(slidr.settings.width).toEqual(500)
  
  it 'settings height', ->
    expect(slidr.settings.height).toEqual(300)
    
  it 'settings thumb width', ->
    expect(slidr.settings.thumb_width).toEqual(100)
  
  it 'settings thumb height', ->
    expect(slidr.settings.thumb_height).toEqual(100)

# elements
describe 'elements', ->
  
  template 'markup.html'
  
  # define var in scope
  slidr =
  
  beforeEach ->
    slidr = new $.slidr $('#example1'), { thumb_width: 100, thumb_height: 100 }
  
  it 'create wrapper', ->
    expect(slidr.el.parent().attr 'class').toEqual('slidr-wrapper')
  
  it 'create thumbs', ->
    expect(slidr.el.siblings('.slidr-thumbs').length).toEqual(1)
  
  it 'thumb width', ->
    expect(slidr.thumbs.el.children().width()).toEqual(slidr.settings.thumb_width)
  
  it 'thumb height', ->
    expect(slidr.thumbs.el.children().height()).toEqual(slidr.settings.thumb_height)
  
  it 'current thumb', ->
    expect(slidr.thumbs.el.children().eq(0).attr 'class').toEqual('current');

# check styles
describe 'check styles', ->
  
  template 'markup.html'
  
  # define var in scope
  slidr =
  
  beforeEach ->
    slidr = new $.slidr $('#example1'), { width: 500, height: 300 }
  
  it 'check slidr width', ->
    expect(slidr.el.width()).toEqual(500)
  
  it 'check slidr height', ->
    expect(slidr.el.height()).toEqual(300)

# variables
describe 'check variables', ->
  
  template 'markup.html'
  
  # define var in scope
  slidr =
  
  beforeEach ->
    slidr = new $.slidr $('#example1'), { width: 500, height: 300 }
  
  it 'current slide', ->
    expect(slidr.current_slide).toEqual(0)
  
  it 'items', ->
    expect(slidr.items).toBeDefined()
  
  it 'thumb items', ->
    expect(slidr.thumbs.el).toBeDefined();

# event handlers
describe 'event handlers', ->
  
  template 'markup.html'
  
  # define var in scope
  slidr = null
    
  window.before_callback = -> 
  
  window.after_callback = -> 
  
  beforeEach ->
    spyOn(window, "before_callback")
    spyOn(window, "after_callback")
    slidr = new $.slidr $('#example1'), { 
      width: 500
      height: 300
      before_slide_change_callback: window.before_callback
      after_slide_change_callback: window.after_callback 
    }
  
  it 'image click', ->
    slidr.el.click()
    expect(slidr.current_slide).toEqual(1);
  
  it 'thumbnail click', ->
    $(slidr.thumbs.el.children()[2]).click();
    expect(slidr.current_slide).toEqual(2);
    
  it 'should run the before slide change callback', ->
    $(slidr.thumbs.el.children()[4]).click()    
    expect(window.before_callback).wasCalled()

  it 'should run the after slide change callback', ->
    
    runs ->
      $(slidr.thumbs.el.children()[4]).click()
    
    waits 500    
    
    runs ->
      expect(window.after_callback).wasCalled()
    
describe 'public methods', ->
  
  template 'markup.html'
  
  # define var in scope
  slidr = null
  
  beforeEach ->
    slidr = new $.slidr $('#example1')
  
  it 'next slide', ->
    slidr.goto_next()
    expect(slidr.current_slide).toEqual(1)
  
  it 'prev slide', ->
    slidr.goto_prev()
    expect(slidr.current_slide).toEqual(slidr.items.length-1)
  
  it 'get current slide', ->
    expect(slidr.get_current_slide()).toEqual(0)

  it 'get slide', ->
    expect($(slidr.get_slide(1)).length).toEqual(1)
  
  it 'is auto slide playing', ->
    expect(slidr.is_auto_slide_playing()).toBeFalsy()
    
  it 'is auto slide playing', ->
    slidr.auto_slide_start()
    expect(slidr.is_auto_slide_playing()).toBeTruthy()
  
  it 'auto slide start', ->
    expect(slidr.auto_slide_start()).toBeTruthy()
  
  it 'auto slide stop', ->
    expect(slidr.auto_slide_stop()).toBeTruthy()
  
# Transitions module
describe 'transitions', ->
  
    template 'markup.html'
    
    slidr = null
    
    beforeEach ->
      slidr = new $.slidr $('#example1')
      spyOn(slidr.transitions, "before")
      # spyOn(slidr.transitions, "do_transition")
      
    it 'should run before method when slide changes', ->
      slidr.goto_next()
      expect(slidr.transitions.before).wasCalled()