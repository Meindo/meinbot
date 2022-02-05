#!/usr/bin/bash
RED=`tput setaf 1`
GREEN=`tput setaf 2`
YELLOW=`tput setaf 3`
RESET=`tput sgr0`
unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     machine=Linux;;
    Darwin*)    machine=Mac;;
    CYGWIN*)    machine=Cygwin;;
    MINGW*)     machine=MinGw;;
    *)          machine="UNKNOWN:${unameOut}"
esac
echo "${GREEN}Welcome to the MeinBot package installer"
echo ""
while true; do
    read -p "${YELLOW}Do you want to continue? This will install the required packages " yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit;;
    esac
done
echo "${RESET}"
if ! command -v node &> /dev/null
then
    echo "${RED}NodeJS could not be found, Installing now..."
    if ["$unameOut" = "MinGw" || "$unameOut" = "Cygwin"]; then
        ./wget.exe -O nodeInstall16.msi https://nodejs.org/dist/v16.13.2/node-v16.13.2-x64.msi
        ./nodeInstall16.msi
        rm nodeInstall16.msi
        exit 
    else
    if ["$unameOut" = "Linux"]; then
        sudo apt-get install nodejs 
    fi
    fi
fi
if ! command -v node &> /dev/null
then
    echo "${RED}Could not install nodejs, please download and install nodejs and rerun this script"
fi
if ! command -v npm &> /dev/null
then
    echo "${RED}Could not find NPM, please install npm and rerun this script"
fi
npm install
echo "${GREEN}Done"