const fs = require('fs');

module.exports = {
    name: "8ball",
    description: "Iluminates your soul with some random generated phrases",
    execute(message, args) {
        let phrases = [];
        try {
            phrases = JSON.parse(fs.readFileSync("./commands/8ball.json")).phrases;
        } catch {
            phrases = { "phrases": ["Why are we still here just to suffer"] };
            fs.writeFileSync("./commands/8ball.json", JSON.stringify(phrases))
        }
        const max = phrases.length
        let seed = Math.floor(Math.random() * (max));
        console.log(`Attempting to send message: ${phrases[seed]} with seed: ${seed}`);
        message.channel.send(phrases[seed]);
    }
}