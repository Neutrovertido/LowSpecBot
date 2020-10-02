const { MessageEmbed } = require("discord.js");

const helpEmbed = new MessageEmbed()
  .setColor("#010101")
  .setTitle("Current Commands")
  .setDescription(
    ":one: **help:** Shows this message\n:two: **mc:** Displays the secret apple related message\n:three: **tehc-support:** Gives you tehc support\n:four: **bot:** Displays the **bot message**!\n:five: **prefix:** Changes the bot prefix.\n\nDefault prefix is **_**."
  )
  .setTimestamp();

module.exports = {
  name: "help",
  description: "Help users.",
  execute(message, args) {
    message.channel.send(helpEmbed);
  },
};
