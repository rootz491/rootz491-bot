const Discord = require('discord.js');
const Subscriber = require("../schemas/subscriber");

module.exports = {
    name: 'messageCreate',
    once: false,
    execute: async (message) => {
        if (message.author.bot) return;
        
        const client = message.client;
        const prefix = '!';
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        /* CHECKING FOR LEGACY COMMANDS i.e. starts with "!" */
        if (command === 'ping') {
            const m = await message.channel.send('Ping?');
            await m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
        }
        else if (command === 'accept') {
            let welcomeRole = message.member.guild.roles.cache.find(role => role.name === 'noobie');
            message.member.roles.add(welcomeRole);

            message.channel.send(`Hii ${message.member.user.username}, \nNow that you've accepted the rules!\nFeel free to join discussions in <#928286832209326082> and <#928287311836364802>.\nCheers!`);
        }

        /* CHECKING FOR ALERT USER */
        const catergories = ['bot-testing', 'developer'];  //  categories that are selected for the alert
        const msgCategory = message.channel.parent.name;    //  to get message's channel's category's name
        // console.log(catergories.includes(msgCategory));
        if (catergories.includes(msgCategory)) {
            // const user = message.author;
            const subscribers = await Subscriber.find();
            for (let subscriber of subscribers) {
                const user = await client.users.fetch(subscriber.userId);
                const msgEmbed = new Discord.MessageEmbed({
                    title: `Alert from ${message.member.guild.name} Server`,
                    description: `**${message.author.username}** has sent a message in **${message.channel}** channel of ***${message.channel.parent.name}*** category.\n\nFirst-Line: \`\`\`${message.content.split('\n')[0]}\`\`\`\n`,
                    color: "RANDOM",
                    timestamp: new Date(),
                    footer: {
                        text: `${message.author.username}`,
                        icon_url: `${message.author.avatarURL()}`
                    }
                })
                user.send({ embeds: [msgEmbed] });
            }
        }
    }
}