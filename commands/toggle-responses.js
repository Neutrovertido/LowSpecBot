// Toggle random responses
const fs = require("fs");

module.exports = {
    name: "toggle-responses",
    description: "Toggle random responses on or off.",
    execute(message, args) {
        const author = message.guild.member(message.author);

        if (author.hasPermission("ADMINISTRATOR")) {
            let config = JSON.parse(fs.readFileSync("./config.json").toString());
            let value = args[0];
            if (value === undefined) {
                value = "";
            } else {
                value = value.toLowerCase();
            }

            if (value === "on") {
                config.responses = true;
            } else if (value === "off") {
                config.responses = false;
            } else if (value.length === 0) {
                if (config.responses === true) {
                    config.responses = false;
                } else if (config.responses === false) {
                    config.responses = true;
                } else {
                    config.responses = false;
                }
            }

            if (value.length > 0 && value != "on" && value != "off") {
                message.reply('please use the arguments: `on/off` or leave empty.');
                console.error(`❌ Invalid argument!`);
            } else {
                fs.writeFileSync("./config.json", JSON.stringify(config));
                if (config.responses === true) {
                    message.reply("🎲 Random responses has been set to **ON**")
                    console.log(`🎲 Random responses: ON`);
                } else {
                    message.reply("🎲 Random responses has been set to **OFF**")
                    console.log(`🎲 Random responses: OFF`);
                }
            }

        } else {
            message.channel.send("❌ You do not have permission to issue that command!");
            console.error(`❌${author} doesn't have permission to issue that command!`);
        }
    },
};
