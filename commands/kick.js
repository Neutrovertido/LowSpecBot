module.exports = {
  name: "kick",
  description: "Kick someone from the server.",
  execute(message, args) {
    const author = message.guild.member(message.author);
    if (author.hasPermission("KICK_MEMBERS")) {
      const target = message.mentions.users.first();
      const reason = args;
      if (target) {
        const member = message.guild.member(target);
        if (member) {
          member
            .kick(`${target.tag} kicked by ${author.tag}. Reason: ${reason}`)
            .then(() => {
              message.reply(`Successfully kicked ${target.tag}`);
            })
            .catch((err) => {
              message.reply("I was unable to kick the member");
              console.error(err);
            });
        } else {
          message.reply("That user isn't in this guild!");
        }
      } else {
        message.reply("You didn't mention the user to kick!");
      }
    } else {
      message.reply("You don't have the permission to do that!");
    }
  },
};
