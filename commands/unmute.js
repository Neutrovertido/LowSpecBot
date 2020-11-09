module.exports = {
  name: "unmute",
  description: "Unmutes people in a voice channel.",
  execute(message, args) {
    const voiceChannel = message.member.voice.channel;
    const members = voiceChannel.members;
    members.forEach((member) => {
      if (member.voice.mute === true) {
        member.voice.setMute(false);
        message.channel.send(
          ":microphone2: **Successfully unmuted everyone in the voice channel!**"
        );
      }
    });
  },
};
