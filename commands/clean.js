module.exports = {
    name: "clean",
    description: "Erases the amount messages specified with a maximum of 100",
    execute(message, args) {
        const author = message.guild.member(message.author);
        if (author.hasPermission("ADMINISTRATOR")) {
            async function clean() {
                const am = parseInt(args[0]);
                message.delete();
                let fetched;
                console.log(am);
                if (typeof am === "number") {
                    fetched = await message.channel.messages.fetch({ limit: am });
                } else {
                    fetched = await message.channel.messages.fetch({ limit: 1 });
                    am = 1;
                    console.log(fetched);
                }
                message.channel.bulkDelete(fetched);
                message.channel.send(`:recycle: Deleted ${am} messages!`);
            }
            clean();
        } else {
            message.reply("You don't have sufficient permission to issue that command!");
        }
    },
};
