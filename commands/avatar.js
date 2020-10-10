const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "avatar",
  description: "Display user avatar.",
  execute(message, args) {
    let target = message.author;
    if (args.length > 0) {
      try{
        target = message.mentions.users.first()
      } catch {
        console.error("Failed to show tagged user!")
      }
    }
    const avatarEmbed = new MessageEmbed()
      .setColor("#FB3B5E")
      .setTitle(`${target.username}'s avatar:`)
      .setImage(
        `${target.displayAvatarURL({
          format: "png",
          dynamic: true,
        })}`
      )
    return message.channel.send(
      avatarEmbed
    );
  },
};
