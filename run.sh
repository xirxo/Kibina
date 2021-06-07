if test -d ./build && $(ls -A ./build) ; then
    rm -rf ./build
fi

npm run build
clear
node .