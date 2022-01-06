// const Discord = require('discord.js');
const { Client, Intents, MessageEmbed } = require('discord.js');
require('dotenv').config();

// create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

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
    const targetChannelId = `928712335651115048` //Channel For Rules

    let welcomeRole = member.guild.roles.cache.find(role => role.name === 'noobie');
    member.roles.add(welcomeRole);

    const channel = member.guild.channels.cache.get(welcomechannelId)

    // const WelcomeEmbed = new MessageEmbed()
    // .setTitle(`Welcome To ${member.guild.name}`)
    // .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 512}))
    // .setDescription(`Hello <@${member.user.id}>, Welcome to **${member.guild.name}**. Thanks For Joining Our Server.
    // Please Read ${member.guild.channels.cache.get(targetChannelId).toString()}, and assign yourself some roles at <#846341532520153088>. You can chat in <#753484351882133507> and talk with other people.`)
    // // You Can Add More Fields If You Want
    // .setColor('RANDOM')

    const WelcomeMessage =  `Hello <@${member.user.id}>, Welcome to **${member.guild.name}**. Thanks For Joining Our Server.\nPlease Read ${member.guild.channels.cache.get(targetChannelId).toString()} before using sever.`
    channel.send(WelcomeMessage);
})

client.on('guildMemberRemove', async (member) => {
    console.log(member);

    const goodbyeChannelId = '928716548334583868' //Channel You Want to Send The Good Bye Message

    const channel = member.guild.channels.cache.get(goodbyeChannelId);

    // const GoodByeEmbed = new MessageEmbed()
    // .setTitle(`Tata From ${member.guild.name}`)
    // .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 512}))
    // .setDescription(`Hello <@${member.user.id}>, Good Bye from **${member.guild.name}**. Thanks For Being A Member Of Our Server. I Hope You Will Come Back Again.`)
    // // You Can Add More Fields If You Want
    // .setColor('RANDOM')

    const GoodByeMessage =  `Hello <@${member.user.id}>, Good Bye from **${member.guild.name}**. Thanks For Being A Member Of Our Server. I Hope You Will Come Back Again.`
    channel.send(GoodByeMessage);
});

client.on('message', async message => {
    if (message.author.bot) return;
    // if (message.channel.type === 'dm') return;

    const prefix = '!';
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'ping') {
        const m = await message.channel.send('Ping?');
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
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
