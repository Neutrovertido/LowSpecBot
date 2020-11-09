module.exports = {
  name: "mute",
  description: "Mutes people in a voice channel.",
  execute(message, args) {
    const voiceChannel = message.member.voice.channel;
    const members = voiceChannel.members;
    members.forEach((member) => {
      if (member.voice.mute === false) {
        member.voice.setMute(true);
        message.channel.send(
          ":mute: **Successfully muted everyone in the voice channel!**"
        );
      }
    });
  },
};
