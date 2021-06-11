clear

if test -d ./build ; then
    rm -rf ./build/
fi

npm run build:watch &
sleep 10

clear

if command -v nodemon &> /dev/null ; then
    clear
    nodemon -q ./build/index.js &
else
    clear
    node ./build/index.js &
fi

wait