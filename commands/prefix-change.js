// Change Prefix
const fs = require("fs");
const permittedPrefixes = ["~", "!", "$", "%", "^", "&", "*", "_"];

module.exports = {
  name: "prefix",
  description: "Change commands prefix.",
  execute(message, args) {
    const author = message.guild.member(message.author);
    if (author.hasPermission("ADMINISTRATOR")) {
      if (permittedPrefixes.includes(args[0])) {
        let config = JSON.parse(fs.readFileSync("./config.json").toString());
        config.prefix = args[0];
        fs.writeFileSync("./config.json", JSON.stringify(config));
        message.reply(`🔣 prefix changed to ${args[0]}.`);
        console.log(`🔣 Prefix has been changed to ${args[0]}`);
      } else if (args.length === 0) {
        message.reply(`please specify a prefix.`);
        console.error(`❌ prefix not specified!`);
      } else {
        message.reply(`❌ prefix not permitted,  try another one.`);
        console.error(`❌ prefix is not permitted!`);
      }
    } else {
      message.channel.send("You do not have permission to issue that command!");
      console.error(`❌ ${author} doesn't have sufficient permission to issue that command!`);
    }
  },
};
