module.exports = {
    name: "countdown",
    description: "Creates a locked voice channel with a countdown in its name.",
    execute(message, args) {
        const author = message.guild.member(message.author);
        if (author.hasPermission("ADMINISTRATOR")) {
            message.guild.channels.create('Countdown:', {
                type: 'voice',
                permissionsOverwrites: [
                    {
                        
                    }
                ]
            });
            message.channel.send(`:alarm_clock: Countdown created!`);
        } else {
            message.channel.send(`:no_entry: You don't have permission to perform that command!`);
        }
    }
}