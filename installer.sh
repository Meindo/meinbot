#!/usr/bin/bash
RED=`tput setaf 1`
GREEN=`tput setaf 2`
YELLOW=`tput setaf 3`
RESET=`tput sgr0`

echo "${GREEN}Welcome to the MeinBot package installer"
echo ""
while true; do
    read -p "${YELLOW}Do you want to continue? This will install the required packages (YN) " yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit;;
    esac
done
echo "${RESET}"
if ! command -v node &> /dev/null
then
    echo "${RED}Could not find nodejs, please install nodejs and rerun this script"
fi
if ! command -v npm &> /dev/null
then
    echo "${RED}Could not find NPM, please install npm and rerun this script"
fi
npm install
echo "${GREEN}Done" 