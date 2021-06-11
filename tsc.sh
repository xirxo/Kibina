#!/usr/bin/env bash

# Check if the build directory exists
# Delete the directory if it exists
if test -d ./build ; then
    rm -rf ./build/
fi

# Build our project
npm run build

# Clear the screen
clear