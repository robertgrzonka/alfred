module.exports = {
  name: 'server',
  description: 'Server info.',
  execute (message) {
    message.channel.send(`Server name: **${message.guild.name}**`)
  }
}
