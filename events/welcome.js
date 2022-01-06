module.exports =  {
    name: 'guildMemberAdd',
    once: false,
    execute(member, Discord, client) {
        const welcomechannelId = '928713742345183272' //Channel You Want to Send The Welcome Message
        const targetChannelId = `928712335651115048` //Channel For Rules

        let welcomeRole = member.guild.roles.cache.find(role => role.name === 'noobie');
        member.roles.add(welcomeRole);

        const channel = member.guild.channels.cache.get(welcomechannelId)

        const WelcomeEmbed = new Discord.MessageEmbed()
        .setTitle(`Welcome To ${member.guild.name}`)
        .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 512}))
        .setDescription(`Hello <@${member.user.id}>, Welcome to **${member.guild.name}**. Thanks For Joining Our Server.
        Please Read ${member.guild.channels.cache.get(targetChannelId).toString()}, and assign yourself some roles at <#846341532520153088>. You can chat in <#753484351882133507> and talk with other people.`)
        // You Can Add More Fields If You Want
        .setFooter(`Welcome ${member.user.username}#${member.user.discriminator}`,member.user.displayAvatarURL({dynamic: true, size: 512}))
        .setColor('RANDOM')
        // member.guild.channels.cache.get(welcomechannelId).send(WelcomeEmbed)
        channel.send(WelcomeEmbed);
    }
}