/* 
 * slidr
 * 
 * Dependencies:
 *   jquery v ?
 * 
 */

;(function($) {
  
  $.slidr = function(el, options) {
    
    // default settings
    var defaults = {
      width           : 800,
      height          : 500,
      thumb_width     : 75,
      thumb_height    : 75,
      slide_interval  : 2500,
      thumbs          : $.slidr_thumbnails
    };
    
    // use the plugin var to access the object everywhere
    var plugin = this;

    // private
    // the "constructor" that gets called when object is created
    var init = function() {
      
      // merge default and user-provided options
      plugin.settings = $.extend(defaults, options);
      
      // make the collection of target elements available throughout the plugin
      // by making it a public property
      plugin.el = el;
      
      // store list items
      plugin.items = plugin.el.children();
      
      // set current slide
      plugin.current_slide = 0;

      // create elements
      create_elements();

      // Run thumbs
      plugin.thumbs = new plugin.settings.thumbs(plugin, options);
      
      // set element styles
      set_styles();
      
      // attach event handlers
      attach_event_handlers();

      // set current slide 
      set_current_slide(plugin.current_slide);

    };
    
    // private
    // create all neccessary elements
    var create_elements = function() {
      
      // create wrapper
      plugin.el.addClass("slidr-slides").wrap('<div class="slidr-wrapper" />');
      

      
    };
    
    // private
    // set styles
    var set_styles = function() {
      
      // set image container style
      plugin.el.css({
        position  : 'relative',
        width     : plugin.settings.width+'px',
        height    : plugin.settings.height+'px',
        overflow  : 'hidden'
      });
      
      // set list item styles
      plugin.el.children().css({
        position  : 'absolute',
        top       : 0
      }).each(function(i) {
        
        // set z-index
        // start z-index value from total length
        $(this).css('zIndex', plugin.items.length-i);
        
      });
      

      
    };
    
    // private
    // attach event handlers
    var attach_event_handlers = function() {
      
      plugin.el.click(function() {
        
        plugin.current_slide++;

        if (plugin.current_slide < plugin.items.length)
          set_current_slide(plugin.current_slide);
        
      });
      
    };
    

    
    // set the current slide to current
    var set_current_slide = function(index) {
      
      // remove class current from all the slides
      plugin.items.removeClass("current");
      
      // add class current to the slide that should be showing
      $(plugin.items[index]).addClass("current");
      
      // update thumb
      plugin.thumbs.set_current_thumb(index);

    };
    
    // PUBLIC METHODS
    
    // start auto slide
    this.auto_slide_start = function() {
      
      plugin.autoslide = setInterval(function() {
        plugin.goto_next();
      }, plugin.settings.slide_interval);
      
    };
    
    // stop auto slide
    this.auto_slide_stop = function() {
      clearInterval(plugin.autoslide);
    };
    
    // Go to slide with index 
    this.goto_slide = function(index) {
      
      plugin.current_slide = index;
      
      set_current_slide(index);
      
      return plugin.current_slide;
    };
    
    // Go to next slide
    this.goto_next = function() {
      plugin.current_slide++;
      
      // if current slide is less than 0, go to the last one
      if ( plugin.current_slide == plugin.items.length )
        plugin.current_slide = 0;
      
      set_current_slide(plugin.current_slide);
      
      return plugin.current_slide;
    };
    
    // Go to previous slide
    this.goto_prev = function() {
      plugin.current_slide--;
      
      // if current slide is less than 0, go to the last one
      if ( plugin.current_slide < 0 )
        plugin.current_slide = plugin.items.length - 1;
      
      set_current_slide(plugin.current_slide);
      
      return plugin.current_slide;
    };
    
    // get current slide
    this.get_current_slide = function() {
      return plugin.current_slide;
    };
    
    // call the "constructor"
    init();
  };
  
  $.slidr_thumbnails = function(plugin, options) {
    var defaults = {
      thumb_width   : 75,
      thumb_height  : 75
    };
    var settings = $.extend(defaults, options);
    
    // reference to obj
    var self = this;
    
    
    var init = function() {
      create_elements();
    }
    
    // create the elements
    var create_elements = function() {
      // create thumbnailsc
      plugin.el.clone().appendTo(plugin.el.parent()).attr('class', 'slidr-thumbs');

      // store thumbs
      self.el = $('.slidr-thumbs');

      // store thumbs children
      self.thumb_items = self.el.children();

      // remove cloned id
      self.el.removeAttr('id');

      // set thumb list elements and its children to settings width and height
      self.thumb_items.add(self.thumb_items.children()).css({
        width   : settings.thumb_width+'px',
        height  : settings.thumb_height+'px'
      });
    }
    
    // set current thumbnail to the current slide
    this.set_current_thumb = function(index) { 
      self.thumb_items.removeClass('current');
      $(self.thumb_items[index]).addClass("current");
    };
    
    init();
  }
  
})(jQuery);