module.exports = {
  name: "unmute",
  description: "Unmutes muted users on a voice channel.",
  execute(message, args) {
    const voiceChannel = message.member.voice.channel;
    const author = message.guild.member(message.author);
    if (author.hasPermission("MUTE_MEMBERS")) {
      try{
        const members = voiceChannel.members;
        let someone = false;
        members.forEach((member) => {
          if (member.voice.mute === true) {
            someone = true;
            member.voice.setMute(false);
          }
          if (!someone) {
            message.channel.send(`:warning: There's nobody to unmute!`);
          }
        });
        message.channel.send(
          ":microphone2: **Successfully unmuted everyone in the voice channel!**"
        );
      } catch {
        message.channel.send(`:no_entry: You must be connected to a channel to issue this command!`);
      }
    } else {
      message.channel.send(`:no_entry: You don't have permission to perform that command!`)
    }
  },
};
