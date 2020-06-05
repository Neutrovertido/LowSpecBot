// Discord API
const Discord = require('discord.js');
const bot = new Discord.Client();

// Environment Variables for Debugging
try {
    const dotenv = require('dotenv');
    dotenv.config();
} finally { }

// Prefixes
const permittedPrefixes = ['~', '!', '$', '%', '^', '&', '*', '_'];
let prefix = '_';

// Help Command Response
const helpEmbed = new Discord.MessageEmbed()
    .setColor('#010101')
    .setTitle('Current Commands')
    .setDescription(':one: **help:** Shows this message\n:two: **mc:** Displays the secret apple related message\n:three: **tehc-support:** Gives you tehc support\n:four: **bot:** Displays the **bot message**!\n:five: **prefix:** Changes the bot prefix.\n\nDefault prefix is **_**.')
    .setTimestamp();

// Welcome message for new members
bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
    if (!channel) return;
    channel.send(`**Welcome to 🕹 LowSpecGuys 📺 , ${member}!**`);
});

// Bot commands
bot.on('message', msg => {
    if (!msg.guild) return;
    switch (msg.content) {
        case `${prefix}bot`:
            msg.reply("**Windows XP Login Sounds**");
            break;
        case `${prefix}help`:
            msg.channel.send(helpEmbed);
            break;
        case `${prefix}mc`:
            msg.reply("**Manela Canzana**");
            break;
        case `${prefix}tehc-support`:
            msg.reply("I'm going to eat you like **banana milkshake**");
            break;
    }
});

// Change Prefix
bot.on('message', msg => {
    if (!msg.guild) return;
    if (msg.content === `${prefix}prefix`) {
        msg.reply(`my prefix is ${prefix}.`);
    } else if (msg.content.startsWith(`${prefix}prefix`)) {
        if (permittedPrefixes.includes(msg.content[8])) {
            prefix = msg.content[8];
            msg.reply(`prefix changed to ${prefix}.`);
        } else if (!permittedPrefixes.includes(msg.content[8])){
            msg.reply(`prefix not permitted,  try another one.`);
        }
    }
});

// Token Method
const token = process.env.TOKEN;
bot.login(token);
console.log("Login successful!");

// Execution Confirmation
console.log("Bot initialized successfully!\nEnjoy the LSG Experience! 🎆")