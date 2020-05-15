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

// Responds at _bot message
bot.on('message', msg => {
    if (msg.content === "_bot") {
        msg.reply("**Windows XP Login Sounds**");
    }
});

// 100% Execution Confirmation
console.log("Bot initialized successfully!\nEnjoy the LSG Experience! 🎆")