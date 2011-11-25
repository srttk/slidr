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
      width: 800,
      height: 500,
      thumb_width: 75,
      thumb_height: 75,
      slide_interval: 2500,
      thumbs: $.slidr_thumbnails,
      before_slide_change_callback: function() {},
      after_slide_change_callback: function() {}
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
        width     : plugin.settings.width+'px',
        height    : plugin.settings.height+'px'
      });
      
      // center images vertically
      plugin.items.children('img').each(function() {
        $(this).css({
          top: ((plugin.settings.height - $(this).height()) / 2)
        });
      });
      
    };
    
    // private
    // attach event handlers
    var attach_event_handlers = function() {
      
      plugin.el.click(function() {
        
        plugin.goto_next();
        
      });
      
      $(document).keydown(function(e) {
        switch (e.keyCode) {
          case 37: // Left arrow key
            plugin.goto_prev();
          break;
          case 39: // Right arrow key
            plugin.goto_next();
          break; 
        }
      });
      
    };
    
    // set the current slide to current
    var set_current_slide = function(index) {
      // run before callback
      plugin.settings.before_slide_change_callback.call(plugin)
      
      // remove class current from all the slides
      plugin.items.removeClass("current");
      
      // add class current to the slide that should be showing
      $(plugin.items[index]).addClass("current");
      
      // update thumb
      plugin.thumbs.set_current_thumb(index);
      
      // run after callback
      plugin.settings.after_slide_change_callback.call(plugin)
      
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
    
    // is slider auto playing?
    this.is_auto_slide_playing = function() {
      return plugin.autoslide ? true : false;
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
  
})(jQuery);