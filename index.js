// Filesystem is required to read the token file
fs = require('fs');

// Discord API
const Discord = require('discord.js');
const bot = new Discord.Client();
let token = '';

// Token Async AUTH Method
fs.readFile('token', 'utf-8', (err, data) => {
    if (err) {
        throw err;
    }
    const token = data;
    
    bot.login(token);
    console.log("Login successful!");
});

// Simple Responses
bot.on('message', msg => {
    switch (msg.content) {
        case '_bot':
            msg.reply("**Windows XP Login Sounds**");
            break;
        case '_help':
            msg.channel.send("**Current Commands:**\n:one: _help: Shows this message\n:two: _mc: Displays the secret apple related message\n:three: _tehc-support: Gives you tehc support");
            break;
        case '_mc':
            msg.reply("**Manela Canzana**");
            break;
        case '_tehc-support':
            msg.reply("I'm going to eat you like **banana milkshake**");
            break;
    }
});

// 100% Execution Confirmation
console.log("Bot initialized successfully!\nEnjoy the LSG Experience! 🎆")