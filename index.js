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

// Prefix
let prefix;
try{
  prefix = JSON.parse(fs.readFileSync("./config.json")).prefix;
} catch {
  const config = {"prefix":"_"};
  fs.writeFileSync("./config.json", JSON.stringify(config))
  prefix = "_";
}

// Commands Handling
bot.on("message", (message) => {

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

bot.on("message", (message) => {
  //Random response
  let checkPath = "./commands/8ball.json"
  if (!message.author.bot) {
    try {
      if (fs.existsSync(checkPath)) {
        let responseSeed = Math.round(Math.random() * (15));
        console.log(responseSeed)
        if (responseSeed === 12) {
          const args = message.content.slice(prefix.length).trim().split(/ +/);
          const command = args.shift().toLowerCase();
          try {
            bot.commands.get("8ball").execute(message, args);
          } catch (error) {
            console.error(error);
            message.reply("there was an error trying to execute that command!");
          }
        }
      }
    } catch (err) {
      message.channel.send(":warning: A critical error has ocurred! Please check out the logs!");
      console.error(err);
    }
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
