module.exports =  {
    name: 'guildMemberRemove',
    once: false,
    execute(member, Discord, client) {
        console.log('hit');
        const goodbyeChannelId = '928716548334583868' //Channel You Want to Send The Good Bye Message

            const channel = member.guild.channels.cache.get(goodbyeChannelId);

            const GoodByeEmbed = new Discord.MessageEmbed()
            .setTitle(`Tata From ${member.guild.name}`)
            .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 512}))
            .setDescription(`Hello <@${member.user.id}>, Good Bye from **${member.guild.name}**. Thanks For Being A Member Of Our Server. I Hope You Will Come Back Again.`)
         // You Can Add More Fields If You Want
            .setFooter(`Bye Bye ${member.user.username}#${member.user.discriminator}`,member.user.displayAvatarURL({dynamic: true, size: 512}))
            .setColor('RANDOM')
        // member.guild.channels.cache.get(welcomechannelId).send(WelcomeEmbed)
        channel.send(GoodByeEmbed);
    }
}