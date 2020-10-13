const fs = require('fs');
const { MessageEmbed } = require("discord.js");

const commands = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));
let description = "";

for (let f of commands) {
    let command = require(`./${f}`);
    description += `\n**${command.name}**: ${command.description}`
}

const helpEmbed = new MessageEmbed()
  .setColor("#010101")
  .setTitle("Current Commands")
  .setDescription(description)
  .setTimestamp();

module.exports = {
    name: "help",
    description: "Prints information about every command",
    execute(message, args) {
        message.channel.send(helpEmbed);
    }
}