#!/usr/bin/env node

//Copyright 2022 MeindoMC
//This file is licensed under the MIT license
//Version 1.4

const mf = require('mineflayer')
const pvp = require('mineflayer-pvp').plugin
const armorManager = require('mineflayer-armor-manager')

//WEBSERVERS. Will automatically disable if the [disableWeb] argument is set to true
if(process.argv[4] === "true"){
    var inventoryViewer = require('mineflayer-web-inventory');
    var { mineflayer: mineflayerViewer } = require('prismarine-viewer');
}

const autoeat = require("mineflayer-auto-eat")
const chalk = require("chalk")
const navigatePlugin = require('mineflayer-navigate')(mf);
const scaffoldPlugin = require('mineflayer-scaffold')(mf);
const { pathfinder, Movements, goals} = require('mineflayer-pathfinder')

const usrNameOfOwnerDC = process.argv[7] || "Steve";

//start boilerplate

const options = {
    host: process.argv[2], 
    port: parseInt(process.argv[3]),
    username: process.argv[6] ? process.argv[7] : 'MeinBot',
    password: process.argv[8],
    version: process.argv[5]
}

const invOptions = {
    port: 6001
}

const bot = mf.createBot(options)

if(process.argv[4] === "true"){
    inventoryViewer(bot, invOptions)
    bot.once('spawn', () =>{
        mineflayerViewer(bot, { port: 3007, firstPerson: true })
    })
}


bot.loadPlugin(pathfinder)
bot.loadPlugin(armorManager)
bot.loadPlugin(pvp)
bot.loadPlugin(autoeat)
bot
navigatePlugin(bot)
scaffoldPlugin(bot)

bot.on('spawn', () =>{
    setTimeout(() =>{
        bot.autoEat.options.priority = "saturation"
        bot.autoEat.options.bannedFood = []
        bot.autoEat.options.eatingTimeout = 2
    }, 500)
})

if (process.argv.length < 4 || process.argv.length > 8) {
    console.log('Usage : node meinbot.js <host> <port> [<disableWeb>] [<version>] [<name>] [<name of the owner>] [<password>]')
    process.exit(1)
  }

//end boilerplate

bot.on('playerCollect', (collector, itemDrop) =>{
    if(collector !== bot.entity) return

    setTimeout(() => {
        const sword = bot.inventory.items().find(item => item.name.includes('sword'))
        if(sword) bot.equip(sword, 'hand')
    }, 150)
    setTimeout(() =>{
        const shield = bot.inventory.items().find(item => item.name.includes('shield'))
        if (shield) bot.equip(shield, 'off-hand')
    }, 250)
})

bot.once('resourcePack', () => { 
    bot.acceptResourcePack()
  })

bot.on('kicked', (reason, loggedIn) => {
    console.log(reason, loggedIn)
});

//Message and command handling 
bot.on('chat', (username, message) => {
    if(username === 'MeinBot') return
    const player = bot.players[username]
    switch(message){
        case "meinbot":
            setTimeout( () => bot.chat('MeinBot v1.4'), 100)
            setTimeout( () => bot.chat('CMDS:'), 150)
            setTimeout( () => bot.chat('fight'), 200)
            setTimeout( () => bot.chat('guard'), 250)
            setTimeout( () => bot.chat('stop'), 300)
            setTimeout( () => bot.chat('dc'), 350)
            setTimeout( () => bot.chat('come'), 400)
            setTimeout( () => bot.chat('eat'), 450)  
        break;
        case "meinbot come":
            var target = bot.players[username].entity;
            bot.chat("coming")
            bot.scaffold.to(target.position, function(err) {
            if (err) {
            bot.chat("didn't make it: " + err.code);
            }
        });
        break;
        case "meinbot fight":
            if(!player){
                bot.chat("I cant see you.")
                return
            }
            bot.chat('Okay, prepare to fight ' + player.displayName.toString())
            bot.pvp.attack(player.entity)
        break;
        case "meinbot guard":
            if(!player){
                bot.chat("I cant see you.")
                return
            }
    
            bot.chat("Okay, i will guard that position")
            guardArea(player.entity.position)
        break;
        case "meinbot eat":
            const prevItem = bot.heldItem
            const gapple = bot.inventory.items().find(item => item.name.includes('apple'))
            if(gapple){
                bot.equip(gapple)
                bot.autoEat.eat(function (err) {
                if(err){
                   return
                } else{
                    console.log(chalk.yellow('I ate an apple!'))
                }
                bot.equip(prevItem)
                })
            } else{
                console.log(chalk.red("Could not find apple in inventory of player"))
            }
        break;
        case "meinbot stop":
            bot.chat("Okay, stopped")
            stopGuarding()
        break;
        case "meinbot dc":
            if(player.displayName.toString() !== usrNameOfOwnerDC) return
            bot.chat("Okay, bye!")
            process.exit(1)
        break;
    }

})


let guardPos = null

function guardArea(pos){
    guardPos = pos.clone()

    if(!bot.pvp.target){
        moveToGuardPos()
    }
}

function stopGuarding(){
    guardPos = null
    bot.pvp.stop()
    bot.pathfinder.setGoal(null)
}

function moveToGuardPos(){
    const mcData = require('minecraft-data')(bot.version)
    bot.pathfinder.setMovements(new Movements(bot, mcData))
    bot.pathfinder.setGoal(new goals.GoalBlock(guardPos.x, guardPos.y, guardPos.z))
}

bot.on('physicTick', () =>{
    if(!guardPos) return

    const filter = e => e.type === 'mob' && e.position.distanceTo(bot.entity.position) < 16 && e.mobType !== 'Armor Stand'
    const entity = bot.nearestEntity(filter)
    if(entity){
        bot.pvp.attack(entity)
    }
})

bot.on('stoppedAttacking', () => {
    if(guardPos){
        moveToGuardPos()
    }
})

bot.on('physicTick', () => {
    if(bot.pvp.target) return
    if(bot.pathfinder.isMoving()) return
    
    const entity = bot.nearestEntity()
    if(entity) bot.lookAt(entity.position.offset(0, entity.height, 0))
})

bot.on('physicTick', () => { 
    if(bot.health < 10){
        const prevItem = bot.heldItem
        const gapple = bot.inventory.items().find(item => item.name.includes('apple'))
        const pot = bot.inventory.items().find(item => item.name.includes('potion'))
        if(gapple){
            bot.equip(gapple)
            bot.autoEat.eat(function (err) {
            if(err){
                return
            } else {
                console.log(chalk.yellow('I ate an apple!'))
            }
            bot.equip(prevItem) 
        })
        } else if(pot){
            bot.equip(pot)
            bot.autoEat.eat()
            bot.equip(prevItem)
        } else{
            console.log(chalk.red("Could not find apple or potion in inventory of player"))
        }
        
    }
})