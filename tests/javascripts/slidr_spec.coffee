# require scripts
require '/jquery-1.7.1.js'
require '/jquery.slidr.js'
require '/jquery.slidr.thumbnails.js'

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
  slidr =
  
  beforeEach ->
    slidr = new $.slidr $('#example1'), { width: 500, height: 300 }
  
  it 'image click', ->
    slidr.el.click()
    expect(slidr.current_slide).toEqual(1);
  
  it 'thumbnail click', ->
    $(slidr.thumbs.el.children()[2]).click();
    expect(slidr.current_slide).toEqual(2);
    
describe 'public methods', ->
  
  template 'markup.html'
  
  # define var in scope
  slidr =
  
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
  
  it 'is auto slide playing', ->
    expect(slidr.is_auto_slide_playing()).toBeFalsy()
    
  it 'is auto slide playing', ->
    slidr.auto_slide_start()
    expect(slidr.is_auto_slide_playing()).toBeTruthy()

#describe 'keys', ->
#  
#  template 'markup.html'
#  
#  # define var in scope
#  slidr =
#  
#  beforeEach ->
#    slidr = new $.slidr $('#example1'), { width: 500, height: 300 }
#  
#  it 'slide left', ->
#    # trigger key left
#    e = jQuery.Event 'keydown'
#    e.which = 37
#    $(document).trigger e;
#    
#    expect(slidr.current_slide).toEqual(slidr.items.length-1)
#  
#  it 'slide right', ->
#    # trigger key left
#    e = jQuery.Event('keydown')
#    e.which = 39
#    $(document).trigger e;
#  
#    expect(slidr.current_slide).toEqual(1)