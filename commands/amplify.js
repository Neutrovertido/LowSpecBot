const fs = require('fs');

const emojify = (i) => {
    if (i.match("[a-z]")) {
        return `:regional_indicator_${i}:`;
    } else if (i.match("[0-9]")) {
        switch (i) {
            case "1":
                return ":one:";
            case "2":
                return ":two:";
            case "3":
                return ":three:";
            case "4":
                return ":four:";
            case "5":
                return ":five:";
            case "6":
                return ":six:";
            case "7":
                return ":seven:";
            case "8":
                return ":eight:";
            case "9":
                return ":nine:";
            case "0":
                return ":zero:";
        }
    } else {
        return i;
    }
}

module.exports = {
    name: "amplify",
    description: "Translates normal text messages into regional indicator emojis.",
    execute(message, args) {
        const actualMessage = message.content.split(' ').slice(1).join(' ');
        if (actualMessage.length > 0) {
            let amplified = actualMessage.toLowerCase().split('');
            let iteration = 0;

            amplified.forEach(element => {
                amplified[iteration] = emojify(element);
                iteration++;
            });

            let result = amplified.join(' ');

            message.delete();
            message.channel.send(result);
        } else {
            message.reply("You must specify a message!");
        }
    }
}