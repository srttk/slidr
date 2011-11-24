#!/bin/bash

# minify slidr
java -jar /usr/local/bin/compiler.jar --js ../public/jquery.slidr.js ../public/jquery.slidr.thumbnails.js --js_output_file ../public/jquery.slidr.min.js

echo "All done!"