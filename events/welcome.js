const { sendEmbed } = require("../tools/embed");

module.exports =  {
    name: 'guildMemberAdd',
    once: false,
    execute(member) {
        const welcomechannelId = '928713742345183272' //Channel You Want to Send The Welcome Message
        const rulesChannelId = `928712335651115048` //Channel For Rules

        const channel = member.guild.channels.cache.get(welcomechannelId)
    
        const welcomeMsg = {
            title: `Welcome to ${member.guild.name}!`,
            description: `Welcome to the server, ${member.user.username}!\n\nPlease read the rules in ${member.guild.channels.cache.get(rulesChannelId).toString()} and then type \`!accept\` in ${member.guild.channels.cache.get().toString()} to accept them.`,
            thumbnail: member.user.displayAvatarURL({dynamic: true, size: 512}),
            color: 'RANDOM',
            footer: `${member.guild.name} | ${member.guild.memberCount} members`
        }
    
        sendEmbed(welcomeMsg, channel);
    }
}