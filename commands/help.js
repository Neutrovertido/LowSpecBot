const fs = require("fs");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "Prints information about every command",
  execute(message, args) {
    const commands = fs
      .readdirSync("./commands")
      .filter((file) => file.endsWith(".js"));
    let description = "";

    for (let f of commands) {
      let command = require(`./${f}`);
      description += `\n**${command.name}**: ${command.description}`;
    }

    const helpEmbed = new MessageEmbed()
      .setColor("#010101")
      .setTitle("Current Commands")
      .setThumbnail("https://i.imgur.com/mWRCgIm.png")
      .setAuthor(
        "LowSpecBot",
        "https://i.imgur.com/mWRCgIm.png",
        "https://github.com/Neutrovertido/LowSpecBot"
      )
      .setDescription(description)
      .setTimestamp();

    message.channel.send(helpEmbed);
    console.log("📜 Help message sent!");
  },
};
