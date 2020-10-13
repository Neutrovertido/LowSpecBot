module.exports = {
    name: "clean",
    description: "Erases the amount messages specified with a maximum of 100",
    execute(message, args) {
        const author = message.guild.member(message.author);
        if (author.hasPermission("ADMINISTRATOR")) {
            async function clean() {
                message.delete();
                let am = parseInt(args[0]);
                let fetched;
                let qa = 1;
                try{
                    fetched = await message.channel.messages.fetch({ limit: am});
                    qa = am;
                } catch {
                    fetched = await message.channel.messages.fetch({ limit: 1 });
                }
                console.log(`Attempting to delete ${qa} messages!`);
                message.channel.bulkDelete(fetched);
                message.channel.send(`:recycle: Deleted ${qa} messages!`);
            }
            clean();
        } else {
            message.reply("You don't have sufficient permission to issue that command!");
        }
    },
};
