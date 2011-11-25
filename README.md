# slidr
An extendable slider.

## HTML
    <ul id="example1">
        <li><img src="1.jpg" /></li>
        <li><img src="2.jpg" /></li>
        <li><img src="3.jpg" /></li>
        <li><img src="4.jpg" /></li>
    </ul>

## Usage
Include the scripts in your project.

```javascript
var slidr = new $.slidr($('#example1'), {
  width: 800, // max slide width
  height: 500 // max slide height
});
```

## Options
```javascript
var slidr = new $.slidr($('#example1'), {
    width: 800, // max slide width
    height: 500, // max slide height
    thumb_width: 75, // max thumb width
    thumb_height: 75, // max thumb height
    
    // modules
    thumbs: $.slidr_thumbnails, // define thumbnails
    transitions: $.slidr_transitions, // define slide transition
    
    // callbacks
    before_slide_change_callback: function() {}, // function to be called before slide change
    after_slide_change_callback: function() {} // function to be called after slide change
});
```

## Public methods
```javascript
var slidr = new $.slidr($('#example1'), {
  width         : 500,
  height        : 300
});

// Go to next slide
slidr.goto_next();

// Go to previous slide
slidr.goto_prev();

// Got to slide number (start from 0)
slidr.goto_slide(1);

// Autoslide start - set interval to 2 seconds
slidr.auto_slide_start(2000);

// Autoslide stop
slidr.auto_slide_stop();

// is slider auto playing
// returns either true or false
slidr.is_auto_slide_playing();

// get current slide
slidr.get_current_slide();
```

## Tests
Tests are runned with [Evergreen](https://github.com/jnicklas/evergreen)

## Depedencies
jQuery

## Browser support
Tested and works in IE7, IE8, IE9, Chrome (14), FireFox (7), Opera (11)