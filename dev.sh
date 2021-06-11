if test -d ./build ; then
    rm -rf ./build/*
fi

npm run build:watch &> /dev/null &
sleep 10

if command -v nodemon &> /dev/null ; then
    nodemon -q ./build/index.js &
else
    node ./build/index.js &
fi

wait