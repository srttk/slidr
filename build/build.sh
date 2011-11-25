#!/bin/bash

# minify slidr
java -jar /usr/local/bin/compiler.jar --js ../jquery.slidr.js ../jquery.slidr.thumbnails.js --js_output_file ../jquery.slidr.min.js

echo "All done!"