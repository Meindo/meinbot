# MeinBot
MeinBot is an intelligent ai that can do lots of things relevant to pvp in Minecraft.

# Features
MeinBot has an variety of features, all listed here

- Monitoring: The bot now includes monitoring via webserver with view and inventory management.
- Guarding: Defend a specific block from all mobs
- Excellent pvp: It is very good a pvping other players from 1.8 pvp to 1.18 pvp. Using the mineflayer-pvp package
- Automatic Gapples: When its health is under 10 it will attemp to eat golden apples until its health is higher again. Using the mineflayer-autoeat package
- Automatic Armor Equipment: Automaticly equip the best armor from the bot. Using the mineflayer-armor-manager package
- Very good ai pathfinding: MeinBot is great at finding its way in a minecraft world. Using the mineflayer-navigation, mineflayer-scaffold and mineflayer-pathfinding packages

# Installation
To install MeinBot simply clone or download the files in this repo and run the installer.
 ```sh
 ./installer.sh
 ```
NOTE: If the installer cant finish, simply install nodejs and run npm i.

# Requirements
MeinBot is build on mineflayer and needs nodejs and npm to function

# Disabling the webservers
I know that running the 2 webservers at once can be a bit overwhelming to your pc.\
To disable them go into the javascript file and look closely at the comments on the top part. You should then be able to stop them.

# Starting the bot
To start the bot make sure you have everything installed and have run npm install, then run "node meinbot.js |host| |port| |disable the webservers| |version| |name| |name of the owner| |password|\
This bot can run without a password, however it can then only join cracked (Offline mode) servers\
Default value for the bots name is MeinBot\
Default value for the name of the owner is Steve\
To disable the Webservers please put in 'true'as the 3th argument

# Commands:
- meinbot: Show a list of commands in game
- meinbot fight: The bot wil attempt to fight the person that send the message in chat
- meinbot guard: The bot wil walk to your position in game and stand there until mobs come. When the mobs are defeated it wil return to its position until stopped
- meinbot stop: Stop the bot if it is fighting or guarding
- meinbot dc: If you set argument 6 to your MC name then it will stop the main node process and disconnect from the server
- meinbot come: Comes to your position, if its to high or to low it can error out if it doesn't have blocks to build
- meinbot eat: Makes the bot eat an golden apple if in inventory

# Redistributing
MeinBot is licensed under the MIT license.\
Feel free to share and edit the code to your liking.\
You are allowed to redistribute and modify MeinBot as long as you credit me and include the license unchanged.\
For more information please look at the [license](./license) file

# FAQ
This is and side project of mine i made it entirely for fun. Don't expect much from it, tho it is surprisingly good at fighting.
And i know that its not the best code in the world but it does ok.'
- HOW LONG DID IT TAKE ME TO CREATE THIS THING? Not long. Today at this push its 70 days ago that i started MeinBot.
- WIL I BE CONSTANTLY UPDATING THIS? I will try my best, but i don't know what features to add and i also don't have a lot of time. I hope to not make this depreciated.
- CAN I REPORT BUGS/ASK FOR FEATURES? I don't know if much people are going to but sure!
- HOW CAN I ACCESS THE "MONITORING"? At startup it usually says started web server and inventory server on localhost:PORT. Default ports are 3007 for the pov and 6001 for the inventory viewer.

Made With <img src="https://emojis.slackmojis.com/emojis/images/1643514058/151/javascript.png" width="15px" height="15px"> By MeindoMC @ <a href='https://minigameking.net'>MiniGameKing</a>