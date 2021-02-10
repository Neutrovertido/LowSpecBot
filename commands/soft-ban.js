fs = require('fs');

module.exports = {
    name: "soft-ban",
    description: "Continously deletes the specified user messages.",
    execute(message, args) {
        const author = message.guild.member(message.author);
        if (author.hasPermission("MANAGE_MESSAGES")) {
            const target = message.mentions.users.first();
            const reason = args;
            const actualReason = reason.slice(1, reason.length).join(" ");
            if (target) {
                const member = message.guild.member(target);
                const jsonRoute = "./commands/soft-banned.json";
                if (member) {
                    let soft_banned = [];
                    try {
                        soft_banned = JSON.parse(fs.readFileSync(jsonRoute)).soft_banned;
                    } catch {
                        console.log(`⚠ File soft-banned.json could not be read, Overwriting...`);
                        soft_banned = { "soft_banned": [] };
                        fs.writeFileSync(jsonRoute, JSON.stringify(soft_banned))
                    }
                    if (soft_banned.indexOf(member.user.id) > -1) {
                        soft_banned.splice(soft_banned.indexOf(member.user.id));
                        message.reply(`🎤 Successfully removed the soft-ban of ${member}`);
                        console.log(`🎤 ${author} has removed the soft-ban of ${member}`);
                    } else {
                        soft_banned.push(member.user.id);
                        if (actualReason.length > 0) {
                            message.reply(`🔇 Succesfully soft-banned ${member} for reason: ${actualReason}`);
                            console.log(`🔇 ${author} has soft-banned ${member} for reason: ${actualReason}`);
                        } else {
                            message.reply(`🔇 Succesfully soft-banned ${member}`);
                            console.log(`🔇 ${author} has soft-banned ${member}`);
                        }
                    }
                    targets = { "soft_banned": soft_banned };
                    fs.writeFileSync(jsonRoute, JSON.stringify(targets))
                } else {
                    message.reply("❌ That user isn't in this guild!");
                    console.error("❌ That user isn't in this guild!");
                }
            } else {
                message.reply("❌ You didn't mention the user to soft-ban!");
                console.error("❌ User to soft-ban not specified!");
            }
        } else {
            message.reply("❌ You don't have the permission to do that!");
            console.error(`❌ ${author} doesn't have the permission to do that!`);
        }
    },
};
