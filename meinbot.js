#!/usr/bin/env node

const mf = require('mineflayer')
const { pathfinder, Movements, goals} = require('mineflayer-pathfinder')
const { GoalNear } = require('mineflayer-pathfinder').goals
const { plugin } = require('mineflayer-pvp')
const GoalFollow = goals.GoalFollow
const pvp = require('mineflayer-pvp').plugin
const armorManager = require('mineflayer-armor-manager')
const inventoryViewer = require('mineflayer-web-inventory')
const { mineflayer: mineflayerViewer } = require('prismarine-viewer')
const autoeat = require("mineflayer-auto-eat")
const chalk = require("chalk")
var navigatePlugin = require('mineflayer-navigate')(mf);
var scaffoldPlugin = require('mineflayer-scaffold')(mf);
let attackAll = false;
const usrNameOfOwnerDC = "MeindoMC";

const options = {
    host: process.argv[2], 
    port: parseInt(process.argv[3]),
    username: process.argv[5] ? process.argv[5] : 'MeinBot',
    password: process.argv[6],
    version: process.argv[4]
}


const invOptions = {
    port: 6001
}

const bot = mf.createBot(options)


inventoryViewer(bot, invOptions)

bot.loadPlugin(pathfinder)
bot.loadPlugin(armorManager)
bot.loadPlugin(pvp)
bot.loadPlugin(autoeat)
navigatePlugin(bot)
scaffoldPlugin(bot)

bot.on('spawn', () =>{
    setTimeout(() =>{
        bot.autoEat.options.priority = "saturation"
        bot.autoEat.options.bannedFood = []
        bot.autoEat.options.eatingTimeout = 2
    }, 500)
})

if (process.argv.length < 4 || process.argv.length > 6) {
    console.log('Usage : node meinbot.js <host> <port> [<version>] [<name>] [<password>]')
    process.exit(1)
  }

bot.on('playerCollect', (collector, itemDrop) =>{
    if(collector !== bot.entity) return

    setTimeout(() => {
        const sword = bot.inventory.items().find(item => item.name.includes('sword'))
        if(sword) bot.equip(sword, 'hand')
    }, 150)
})

bot.once('resourcePack', () => { 
    bot.acceptResourcePack()
  })

bot.on('playerCollect', (collector, itemDrop) => {
    if(collector !== bot.entity) return

    setTimeout(() =>{
        const shield = bot.inventory.items().find(item => item.name.includes('shield'))
        if (shield) bot.equip(shield, 'off-hand')
    }, 250)
})

bot.on('kicked', (reason, loggedIn) => {
    console.log(reason, loggedIn)
});

  bot.on('chat', function(username, message) {
    if (username === bot.username) return;
    var target = bot.players[username].entity;
    if (message === 'meinbot come') {
        bot.chat("coming")
      bot.scaffold.to(target.position, function(err) {
        if (err) {
          bot.chat("didn't make it: " + err.code);
        } else {
        }
      });
    }
  });

bot.on('chat', (username, message) => {
    if(username === 'MeinBot') return
    if(message === 'meinbot fight'){
        const player = bot.players[username]
        if(!player){
            bot.chat("I cant see you.")
            return
        }

        bot.chat('Okay, prepare to fight ' + player.displayName.toString())
        bot.pvp.attack(player.entity)
    }

    if(message === 'meinbot'){
        const player = bot.players[username]
        setTimeout( () => bot.chat('MeinBot v1.0'), 100)
        setTimeout( () => bot.chat('CMDS:'), 150)
        setTimeout( () => bot.chat('fight'), 200)
        setTimeout( () => bot.chat('guard'), 250)
        setTimeout( () => bot.chat('stop'), 300)
        setTimeout( () => bot.chat('dc'), 350)
        setTimeout( () => bot.chat('come'), 400)
    }
    if(message === 'meinbot guard'){
        const player = bot.players[username]

        if(!player){
            bot.chat("I cant see you.")
            return
        }

        bot.chat("Okay, i will guard that position")
        guardArea(player.entity.position)
    }

    if(message === "meinbot eat"){
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
    }

    if(message === 'meinbot stop'){
        bot.chat("Okay, stopped")
        stopGuarding()
    }

    if(message === 'meinbot dc'){
        const player = bot.players[username]
        if(player.displayName.toString() !== usrNameOfOwnerDC) return
        bot.chat("Okay, bye!")
        process.exit(1)
    }

})

bot.once('spawn', () =>{
    mineflayerViewer(bot, { port: 3007, firstPerson: true })
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
        const pot = bot.inventory.items().find(item => item.name.includes('Potion of Healing'))
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
        } else if(pot){
            bot.equip(pot)
            bot.lookAt(bot)
            bot.consume()
            
        } else{
            console.log(chalk.red("Could not find apple or potion in inventory of player"))
        }
        
    }
})