const { sendEmbed } = require("../tools/embed");

module.exports =  {
    name: 'guildMemberAdd',
    once: false,
    execute(member) {
        const welcomechannelId = '928713742345183272' //Channel You Want to Send The Welcome Message
        const rulesChannelId = `928712335651115048` //Channel For Rules
        const consentChannelId = `928725178156998716` //Channel For Consent

        const welcomeChannel = member.guild.channels.cache.get(welcomechannelId)
        const rulesChannel = member.guild.channels.cache.get(rulesChannelId).toString();
        const consentChannel = member.guild.channels.cache.get(consentChannelId).toString();

        const welcomeMsg = {
            title: `Welcome to ${member.guild.name}!`,
            description: `Welcome to the server, ${member.user.username}!\n\nPlease read the rules in ${rulesChannel} and then type **!accept** in ${consentChannel} to accept them.`,
            thumbnail: member.user.displayAvatarURL({dynamic: true, size: 512}),
            color: 'RANDOM',
            footer: `${member.guild.name} | ${member.guild.memberCount} members`
        }
    
        sendEmbed(welcomeMsg, welcomeChannel);
    }
}