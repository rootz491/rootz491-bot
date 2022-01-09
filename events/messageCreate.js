module.exports = {
    name: 'messageCreate',
    once: false,
    execute: async (message) => {
        if (message.author.bot) return;

        const prefix = '!';
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (command === 'ping') {
            const client = message.client;
            const m = await message.channel.send('Ping?');
            await m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
        }
        else if (command === 'accept') {
            let welcomeRole = message.member.guild.roles.cache.find(role => role.name === 'noobie');
            message.member.roles.add(welcomeRole);

            message.channel.send(`Hii ${message.member.user.username}, \nNow that you've accepted the rules!\nFeel free to join discussions in <#928286832209326082> and <#928287311836364802>.\nCheers!`);
        }
    }
}