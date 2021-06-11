#!/usr/bin/env bash

# Compile our project first
bash ./tsc.sh

# If PM2 is installed and we have a ecosystem.config.js file
# Note: use `pm2 ecosystem` to generate one
if command -v pm2 &> /dev/null && test -f ./ecosystem.config.js ; then
    pm2 start ecosystem.config.js
    sleep 2

# If not (no ecosystem config), we watch our main file
elif command -v pm2 &> /dev/null && ! test -f ./ecosystem.config.js ; then
    pm2 start ./build/index.js
    sleep 2
fi

# Clear the screen again
clear

# Start our app in production mode
NODE_ENV=production node .