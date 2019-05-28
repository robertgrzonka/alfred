module.exports = {
  name: 'prune',
  args: true,
  description: 'Prune it all!',
  usage: '[number of messages]',
  execute: async (message, args) => {
    const amount = parseInt(args[ 0 ])

    if (isNaN(amount)) {
      return message.channel.send('Sorry, but argument needs to be valid number.')
    }
    
    if (amount > 10) {
      return message.channel.send(`You can't delete more than **10 messages** at a time.`)
    }
    
    try {
      const msg = await message.reply(`message deletion starts in **three** seconds.`)
      await msg.delete(3000)
      await message.channel.bulkDelete(amount + 1, true)
      await amount === 1 ? message.channel.send(`Deleted **${amount}** message`) : message.channel.send(`Deleted **${amount}** messages.`)
    } catch (error) {
      message.reply(`Oops, you've crushed it 🆘`)
      console.error(error)
    }
  }
}
