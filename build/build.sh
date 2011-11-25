#!/bin/bash

# This script path 
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"


JS_DIR=$SCRIPT_DIR/..
OUTPUT_DIR=$SCRIPT_DIR/..


# minify slidr
java -jar /usr/local/bin/compiler.jar --js $JS_DIR/jquery.slidr.js $JS_DIR/jquery.slidr.thumbnails.js $JS_DIR/jquery.slidr.transitions.js --js_output_file $OUTPUT_DIR/jquery.slidr.min.js

echo "All done!"