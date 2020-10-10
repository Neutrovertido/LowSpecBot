const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "avatar",
  description: "Display user avatar.",
  execute(message, args) {
    const user = message.author;
    const avatarEmbed = new MessageEmbed()
      .setColor("#FB3B5E")
      .setTitle(`${user.username}'s avatar:`)
      .setImage(
        `${user.displayAvatarURL({
          format: "png",
          dynamic: true,
        })}`
      )
    return message.channel.send(
      avatarEmbed
    );
  },
};
