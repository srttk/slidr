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

    attach_event_handlers();
  };
  
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
  };
  
  // attach event handlers
  var attach_event_handlers = function() {
    // go to slide when clicking on the thumbs
    $("li", self.el).bind("click", function() {
      var el = this;
      // loop els to find the current index
      $("li", self.el).each(function(i) {
        if (el == this) {
          plugin.goto_slide(i);
        }
      });
    });
  };
  
  // set current thumbnail to the current slide
  this.set_current_thumb = function(index) { 
    self.thumb_items.removeClass('current');
    $(self.thumb_items[index]).addClass("current");
  };
  
  init();
};