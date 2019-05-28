module.exports = {
  name: 'king',
  args: true,
  usage: '<user>',
  description: 'Who is the king?',
  execute (message, args) {
    if (args[0] !== 'robert' && args[0] !== 'Robert') {
      return message.channel.send(`No, king is only one—Robert!`)
    }
    return message.channel.send(`Yep, Robert is our Master.`)
  }
}
