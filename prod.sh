bash ./tsc.sh

if command -v pm2 &> /dev/null && test -f ./ecosystem.config.js ; then
    pm2 start ecosystem.config.js
    sleep 2
elif command -v pm2 &> /dev/null && ! test -f ./ecosystem.config.js ; then
    pm2 start ./build/index.js
    sleep 2
fi

clear
NODE_ENV=production node .