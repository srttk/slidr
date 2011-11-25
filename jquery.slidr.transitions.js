// Transitions for the slider
$.slidr_transitions = function(plugin, options) {
  this.plugin = plugin;
  this.fade = 300;
};

// Before transition
$.slidr_transitions.prototype.before = function(new_index) {
  
  // add class to_be_current to the slide that should be showing
  $(this.plugin.items[new_index]).addClass("to_be_current");

};

// After transition
$.slidr_transitions.prototype.after = function(old_index) {
  
  // remove class current from all the slides
  this.plugin.items.removeClass("to_be_current current");
  
  // add class current to the current slide and do animation on opacity
  $(this.plugin.items[this.plugin.current_slide]).css({"opacity": 0}).addClass("current").animate({"opacity": 1}, this.speed);
  

};