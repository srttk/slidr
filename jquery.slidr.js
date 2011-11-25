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
      // modules
      thumbs: $.slidr_thumbnails,
      transitions: $.slidr_transitions,
      // callbacks
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
      
      // Init thumbs
      plugin.thumbs = new plugin.settings.thumbs(plugin, options);
      
      // Init transitions
      plugin.transitions = new plugin.settings.transitions(plugin, options);
      
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
        if( this.complete ) {
          plugin.center_image($(this), plugin.settings.height);
        } else {
          $(this).load(function() {
            plugin.center_image($(this), plugin.settings.height);
          });
        }
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
    
    // Do stuff before slide change
    var before_slide = function(new_index) {
      // run before callback
      plugin.settings.before_slide_change_callback.call(plugin, new_index);
      
      // run transitions
      if (plugin.transitions)
        plugin.transitions.before(new_index);
    };
    
<<<<<<< HEAD
=======
    // Do stuff after slide change
    var after_slide = function(old_index) {
      // run after callback
      plugin.settings.after_slide_change_callback.call(plugin, old_index);
      
      // run transitions
      if (plugin.transitions)
        plugin.transitions.after(old_index);
    };
    
>>>>>>> f7639064e01688ea02c05649a79ec0ef463ad05a
    // set the current slide to current
    var set_current_slide = function(index) {
      // before slide functionality
      before_slide(index);

      // set current slide to new index
      plugin.current_slide = index;
      
      // update thumb
      if (plugin.thumbs)
        plugin.thumbs.set_current_thumb(plugin.current_slide);

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
    
    // get slide by index
    this.get_slide = function(index) {
      return plugin.items[index];
    }

    // center image vertically
    this.center_image = function(image, parent_height) {
      image.css({
        top : (parent_height/2) - (image.height()/2)
      }).parent().addClass('slidr-slide-loaded');
    };
    
    // call the "constructor"
    init();
  };
  
})(jQuery);