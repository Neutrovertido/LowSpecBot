module.exports = {
  name: "ban",
  description: "Ban someone from the server.",
  execute(message, args) {
    const author = message.guild.member(message.author);
    if (author.hasPermission("BAN_MEMBERS")) {
      const target = message.mentions.users.first();
      const reason = args;
      const actualReason = reason.slice(1, reason.length).join(" ");
      if (target) {
        const member = message.guild.member(target);
        if (member) {
          member
            .ban(`Reason: ${actualReason}`)
            .then(() => {
              if (actualReason.length > 0) {
                message.reply(`Successfully banned ${reason[0]} for reason: ${actualReason}`);
              } else {
                message.reply(`Successfully banned ${reason[0]}`);
              }
            })
            .catch((err) => {
              message.reply("I was unable to ban the member");
              console.error(err);
            });
        } else {
          message.reply("That user isn't in this guild!");
        }
      } else {
        message.reply("You didn't mention the user to ban!");
      }
    } else {
      message.reply("You don't have the permission to do that!");
    }
  },
};
