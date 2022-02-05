# MeinBot
MeinBot is an inteligent ai that can do lots of things relevent to pvp.

# Features
MeinBot has an varity of features, all listed here

- Guarding: Defend a spefic block from all mobs
- Exellent pvp: It is very good a pvping other players from 1.8 pvp to 1.18 pvp. Using the mineflayer-pvp package
- Automatic Gapples: When its health is under 10 it will attemp to eat golden apples until its health is higher again. Using the mineflayer-autoeat package
- Automatic Armor Equipment: Automaticly equip the best armor from the bot. Using the mineflayer-armor-manager package
- Very good ai pathfinding: MeinBot is great at finding its way in a minecraft world. Using the mineflayer-navigation, mineflayer-scaffold and mineflayer-pathfinding packages

# Installation
To install MeinBot simply clone or download the files in this repo and run the installer.
 ```sh
 ./installer.sh
 ```
NOTE: It can also manually be installed by downloading nodejs and running npm install.

# Requirements
MeinBot is build on mineflayer and needs nodejs and npm to function

# Starting the bot
To start the bot make sure you have everything installed and have run npm install, then run "node meinbot.js <host> <port> [<version>] [<name>] [<password>]"
This bot can run without a password, however it can only join cracked (Offline mode) servers
Default value for the bots name is MeinBot

# IMPORTANT
This bot has an variable in the main js file called 'usrNameOfOwnerDC'. Change this to your in game minecraft name to get full acces to the bot commands

# Commands:
- meinbot: Show a list of commands in game
- meinbot fight: The bot wil attempt to fight the person that send the message in chat
- meinbot guard: The bot wil walk to your position in game and stand there until mobs come. When the mobs are defeated it wil return to its position until stopped
- meinbot stop: Stop the bot if it is fighting or guarding
- meinbot dc: If you changed the variable in the file to your name then it will stop the main node process and disconnect
- meinbot come: Comes to your position, if its to high or to low it can error out if it doenst have blocks to build
- meinbot eat: Makes the bot eat an golden apple if in inventory

# NOTE
This is and side project of mine i made it entirely for fun. Dont expect much from it, tho it is suprisingly good at fighting.
And i know that its not the best code in the world but it does ok.'
- HOW LONG DID IT TAKE ME TO CREATE THIS THING? Today at this push its 8 days.
- WIL I BE CONSTANTLY UPDATING THIS? I will try my best, but i dont know what features to add and i also dont have a lot of time. I hope to not make this depreciated.
- CAN I REPORT BUGS/ASK FOR FEATURES? Im not sure if much people are going to but sure!