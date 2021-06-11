#!/usr/bin/env bash

# Clear the screen first
clear

# Check if the build directory exists
# Delete the directory if it exists
if test -d ./build ; then
    rm -rf ./build
fi

# Build our project in "watch" mode
npm run build:watch &

# Wait 10 seconds before run our project
sleep 10

# Clear the screen again
clear

# Check if nodemon exists
# If it does, use it
# Else, run our porject normally (use node)
if command -v nodemon &> /dev/null ; then
    nodemon -q ./build/index.js &
else
    node ./build/index.js &
fi

# Wait since we're running in parallel
wait