// Change Prefix
const fs = require("fs");
const permittedPrefixes = ["~", "!", "$", "%", "^", "&", "*", "_"];

module.exports = {
  name: "prefix",
  description: "Change commands prefix.",
  execute(message, args) {
    if (permittedPrefixes.includes(args[0])) {
      let config = JSON.parse(fs.readFileSync("./config.json").toString());
      config.prefix = args[0];
      fs.writeFileSync("./config.json", JSON.stringify(config));
      message.reply(`prefix changed to ${args[0]}.`);

    } else if (args.length === 0){
      message.reply(`please specify a prefix.`)
    } else {
      message.reply(`prefix not permitted,  try another one.`);
    }
  },
};
