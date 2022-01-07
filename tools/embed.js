const Discord = require('discord.js');

module.exports.sendEmbed = (message, channel) => {
    const embedMsg = new Discord.MessageEmbed()
        .setTitle(message.title)
        .setDescription(message.description)
        .setThumbnail(message.thumbnail)
        .setColor(message.color)
        .setFooter(message.footer)
    
    channel.send({ embeds: [embedMsg] });
}