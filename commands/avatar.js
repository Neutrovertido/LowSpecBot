module.exports = {
  name: "avatar",
  description: "Display user avatar.",
  execute(message, args) {
    const user = message.author;
    return message.channel.send(
      `${user.username}'s avatar: ${user.displayAvatarURL({
        format: "png",
        dynamic: true,
      })}`
    );
  },
};
