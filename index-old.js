const { Client, Intents } = require('discord.js');
const { sendEmbed } = require('./tools/embed');
require('dotenv').config();

// create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES] });

// when the client is ready, run this code
client.once('ready', () => {
    console.log('Ready!');
})

// create listener for commands
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('pong');
    } else if (commandName === 'server') {
        await interaction.reply(`Server Info:\n${interaction.guild.name} has ${interaction.guild.memberCount} members!`);
    } else if (commandName === 'user') {
        await interaction.reply(`User Info:\nName: ${interaction.user.username}\nTag: ${interaction.user.tag}\nID: ${interaction.user.id}`);
    }
});

client.on('guildMemberAdd', async (member) => {
    const welcomechannelId = '928713742345183272' //Channel You Want to Send The Welcome Message
    const rulesChannelId = `928712335651115048` //Channel For Rules


    const channel = member.guild.channels.cache.get(welcomechannelId)

    const welcomeMsg = {
        title: `Welcome to ${member.guild.name}!`,
        description: `Welcome to the server, ${member.user.username}!\n\nPlease read the rules in ${member.guild.channels.cache.get(rulesChannelId).toString()} and then type \`!accept\` in ${member.guild.channels.cache.get().toString()} to accept them.`,
        thumbnail: member.user.displayAvatarURL({dynamic: true, size: 512}),
        color: '#00ff00',
        footer: `${member.guild.name} | ${member.guild.memberCount} members`
    }

    sendEmbed(welcomeMsg, channel);
})

client.on('guildMemberRemove', async (member) => {
    console.log(`${member.user.username} has left the server.`)

    const goodbyeChannelId = '928716548334583868' //Channel You Want to Send The Good Bye Message

    const channel = member.guild.channels.cache.get(goodbyeChannelId);

    channel.send(`${member.user.username} has left the server.`)

    const goodbyeMsg = {
        title: `${member.user.username} has left the server!`,
        description: `${member.user.username} has left the server. Let's Hope he/she will return soon!`,
        thumbnail: member.user.displayAvatarURL({dynamic: true, size: 512}),
        color: '#ff0000',
        footer: `${member.guild.name} | ${member.guild.memberCount} members`
    }

    sendEmbed(goodbyeMsg, channel);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    const prefix = '!';
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'ping') {
        const m = await message.channel.send('Ping?');
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    }
    else if (command === 'accept') {
        let welcomeRole = message.member.guild.roles.cache.find(role => role.name === 'noobie');
        message.member.roles.add(welcomeRole);
    }
})

client.on('guildMemberUpdate', (oldMember, newMember) => {
    // console.log(oldMember);
    // console.log(newMember);
    if (oldMember.roles.cache.find(role => role.name === 'noobie')) {
        if (!newMember.roles.cache.find(role => role.name === 'noobie')) {
            newMember.roles.add(oldMember.guild.roles.cache.find(role => role.name === 'noobie'));
        }
    }
})

// login to discord
client.login(process.env.BOT_TOKEN);
