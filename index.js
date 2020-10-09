const fs = require("fs");
const Discord = require("discord.js");
const { error } = require("console");

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

// Environment Variables for Debugging
try {
  const dotenv = require("dotenv");
  dotenv.config();
} finally {
}

// Commands Loading
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

// Commands Handling
bot.on("message", (message) => {
  const prefix = JSON.parse(fs.readFileSync("./config.json")).prefix;

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!bot.commands.has(command)) return;

  try {
    bot.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

// Token Method
const token = process.env.TOKEN;
bot.login(token);
console.log("Login successful!");

// Execution Confirmation
bot.once("ready", () => {
  console.log("Bot initialized successfully!\nEnjoy the LSG Experience! 🎆");
});
