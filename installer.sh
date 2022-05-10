#!/usr/bin/bash

if ! command -v node &> /dev/null
then
    echo "Could not find NodeJS, please install NodeJS and rerun this script"
fi
if ! command -v npm &> /dev/null
then
    echo "Could not find NPM, please install NodeJS and rerun this script"
fi
npm install
echo "Done installing" 