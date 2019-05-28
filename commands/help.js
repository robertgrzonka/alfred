const { prefix } = require('../config.json')
const Discord = require('discord.js')
const { stripIndent } = require('common-tags')

module.exports = {
  name: 'help',
  description: 'List all of commands.',
  aliases: [ 'commands' ],
  usage: '[command name]',
  cooldown: 5,
  execute (message, args) {
    const data = []
    const { commands } = message.client
    const hyphen = '—'
    
    const embed = new Discord.RichEmbed()
      .setColor('#010101')
      .setTitle('Need some help?')
      .setDescription(stripIndent`
      
      Here's a list of available commands with \`description\`, \`usage\` and \`cooldown\`.
      **TIP**: You can send \`${prefix}help [command name]\` to get info on specific command.
      
      `)
      .addField('Commands', commands.map(command => {
        return `\`${command.name}\``
      }).join('\n'), true)
      .addField('Usage', commands.map(command => {
        if (!command.usage) {
          return hyphen
        }
        return `\`${command.usage}\``
      }).join('\n'), true)
      .addField('Cooldown', commands.map(command => {
        if (!command.cooldown) {
          return '3s'
        }
        return command.cooldown + 's'
      }), true)
      .setFooter(`
      2019 © Banquo
      `)
    
    if (!args.length) {
      message.channel.send(embed)
      return message.react('🦑')
    }
    
    const name = args[ 0 ].toLowerCase()
    const command = commands.get(name) ||
      commands.find(c => c.aliases && c.aliases.includes(name))
    
    if (!command) {
      return message.reply(`that's not a valid command :(`)
    }
    
    data.push(`**Name:** ${command.name}`)
    
    if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`)
    if (command.description) data.push(`**Description:** ${command.description}`)
    if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`)

    data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`)

    message.channel.send(data, { split: true })
  }
}
