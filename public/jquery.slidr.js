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
      width         : 800,
      height        : 500,
      thumb_width   : 75,
      thumb_height  : 75
    };
    
    // use the plugin var to access the modalw object everywhere
    var plugin = this;
    
    // object to hold the merged default and user-provided options
    plugin.settings = {};
    
    // private
    // the "constructor" that gets called when object is created
    var init = function() {
      
      // merge default and user-provided options
      plugin.settings = $.extend({}, defaults, options);
      
      // make the collection of target elements available throughout the plugin
      // by making it a public property
      plugin.el = el;
      
      // store list items
      plugin.items = plugin.el.children();
      
      // set current slide
      plugin.current_slide = 0;
      
      // create elements
      create_elements();
      
      // set element styles
      set_styles();
      
      // attach event handlers
      attach_event_handlers();
      
      // set current thumb
      set_current_thumb();
      
    };
    
    // private
    // create all neccessary elements
    var create_elements = function() {
      
      // create wrapper
      plugin.el.wrap('<div class="slidr-wrapper" />');
      
      // create thumbnails
      plugin.el.clone().appendTo(plugin.el.parent()).attr('class', 'slidr-thumbs');
      
      // store thumbs
      plugin.thumbs = $('.slidr-thumbs');
      
      // store thumbs children
      plugin.thumb_items = plugin.thumbs.children();
      
      // remove cloned id
      plugin.thumbs.removeAttr('id');
      
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
      
      // set thumb list elements and its children to settings width and height
      plugin.thumb_items.add(plugin.thumb_items.children()).css({
        width   : plugin.settings.thumb_width+'px',
        height  : plugin.settings.thumb_height+'px'
      });
      
    };
    
    // private
    // attack event handlers
    var attach_event_handlers = function() {
      
      plugin.el.click(function() {
        plugin.current_slide++;
      });
      
    };
    
    // private
    // set current thumbnail
    var set_current_thumb = function() {
      plugin.thumb_items.removeClass('current').eq(plugin.current_slide).addClass('current');
    };
    
    // call the "constructor"
    init();
    
  };
  
})(jQuery);