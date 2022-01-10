const { sendEmbed } = require("../tools/embed");
const Subscriber = require("../schemas/subscriber");

module.exports =  {
    name: 'guildMemberRemove',
    once: false,
    async execute(member) {
        
        /* GOOD BYE MESSAGE */
        const goodbyeChannelId = '928716548334583868' //Channel You Want to Send The Good Bye Message
        const channel = member.guild.channels.cache.get(goodbyeChannelId);
        const goodbyeMsg = {
            title: `${member.user.username} has left the server!`,
            description: `${member.user.username} has left the server. Let's Hope he/she will return soon!`,
            thumbnail: member.user.displayAvatarURL({dynamic: true, size: 512}),
            color: '#ff0000',
            footer: `${member.guild.name} | ${member.guild.memberCount} members`
        }
        sendEmbed(goodbyeMsg, channel);

        /* CHECK & REMOVE IF SUBSCRIBED FROM BD */
        const subscriber = await Subscriber.findOne({userId: member.user.id});
        if (subscriber)
            await subscriber.delete();
    }
}