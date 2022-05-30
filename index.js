console.log("📦 Importing essential libraries...");
const fs = require("fs");
const Discord = require("discord.js");
const { error } = require("console");
console.log("✅ Import successful!");

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

// Environment Variables for Debugging
console.log("⚙ Configuring environment variables...");
try {
  const dotenv = require("dotenv");
  dotenv.config();
} finally {
}

// Commands Loading
console.log("🔃 Loading commands...");
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}
console.log("✅ Commands loaded successfully!");

// Needed Variables
console.log("🔧 Setting up everything...")
let prefix;
let responses;
try {
  prefix = JSON.parse(fs.readFileSync("./config.json")).prefix;
  responses = JSON.parse(fs.readFileSync("./config.json")).responses;
  console.log("✅ Set up successful!");
} catch {
  console.log("⚠ Warning! No configuration file found! Overwriting...");
  const config = { "prefix": "_", "responses": true };
  fs.writeFileSync("./config.json", JSON.stringify(config))
  prefix = "_";
  responses = true;
}

console.log("🔃 Loading modules...")
let phrasesExist = false;
if (fs.existsSync("./commands/8ball.json")) {
  phrasesExist = true;
} else {
  console.log("⚠ Warning! No 8ball configuration file found!\n❌ Responses will be disabled!");
}

let softBannedExist = false;
if (fs.existsSync("./commands/soft-banned.json")) {
  softBannedExist = true;
} else {
  console.log("⚠ Warning! No soft-banned configuration file found!\n❌ Soft bans will be disabled!");
}
console.log("🆗 Modules loaded");

// Modules cycle evaluations
let ignore = false;

const dateify = original => {
  let now = new Date();
  let sentAt = '[' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + ']';
  original = sentAt + ': ' + '"' + original.toString() + '"';
  return original;
}

bot.on("message", (message) => {
  //Random response
  if (!message.author.bot) {
    try {
      if (phrasesExist && responses) {
        let responseSeed = Math.round(Math.random() * (50));
        //console.log(responseSeed)
        if (responseSeed === 12) {
          console.log("📢 Random response triggered!")
          const args = message.content.slice(prefix.length).trim().split(/ +/);
          const command = args.shift().toLowerCase();
          try {
            bot.commands.get("8ball").execute(message, args);
          } catch (error) {
            console.error(error);
          }
        }
      }
    } catch (err) {
      message.channel.send(":warning: A critical error has ocurred! Please check out the logs!");
      console.error(err);
    }
  }

  // Soft-bans
  if (softBannedExist) {
    let sbIDs = JSON.parse(fs.readFileSync("./commands/soft-banned.json")).soft_banned;
    if (sbIDs.indexOf(message.author.id) > -1) {
      ignore = true;
      let bannedMessage = dateify(message.content);
      console.log(`🚫 Soft banned message: ${bannedMessage}`);
      message.delete();
    } else {
      ignore = false;
    }
  }

  // @channel
  let neraiyo = message.content.toLowerCase();
  if (neraiyo.includes("nullpo")) {
    message.channel.send("Gah!");
  }

  // Don't cry 583753611067129856
  if (message.author.id === '583753611067129856') {
    if (message.attachments.size > 0) {
      message.channel.send('https://cdn.discordapp.com/attachments/557422582584836109/980875313175232512/unknown.png');
    }
  }

});

// Commands Handling
bot.on("message", (message) => {

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!bot.commands.has(command)) return;

  if (message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) {
    ignore = false;
  }

  console.log(`${dateify(message.content)} issued by ${message.author.username}`);

  if (!ignore) {
    try {
      bot.commands.get(command).execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply("there was an error trying to execute that command!");
      console.error("❌ Previous command failed to execute")
    }
  } else {
    ignore = false;
  }
});

// Token Method
const token = process.env.TOKEN;
bot.login(token);
console.log("🔑 Login successful!");

// Execution Confirmation
bot.once("ready", () => {
  console.log("✔ Bot initialized successfully!\nEnjoy the LSG Experience! 🎆");
});
