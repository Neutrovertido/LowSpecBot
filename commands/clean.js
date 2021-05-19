module.exports = {
    name: "clean",
    description: "Erases the amount messages specified with a maximum of 100",
    execute(message, args) {
        const author = message.guild.member(message.author);
        if (author.hasPermission("MANAGE_MESSAGES")) {
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
                message.channel.bulkDelete(fetched);
                message.channel.send(`:recycle: Deleted ${qa} messages!`);
                let messages = fetched;
                let amount = 0;
                messages.forEach(e => {
                    console.log(`♻ Attempting to delete: "${e.content}"`);
                    amount++;
                });
                console.log(`💥 Deleted ${amount} messages!`);
            }
            clean();
        } else {
            message.reply("⛔ You don't have sufficient permission to issue that command!");
            console.error(`⛔ ${author} doesn't have sufficient permission to issue that command!`)
        }
    },
};
