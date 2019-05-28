module.exports = {
  name: 'ping',
  description: 'Ping!',
  execute (message, args) {
    const number = parseInt(args[0])
    isNaN(number) ? message.channel.send('Sorry, but argument needs to be valid number.') : message.reply(`Pong ${number} times!`)
  }
}
