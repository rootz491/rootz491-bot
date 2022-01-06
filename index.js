const { Client, Intents } = require('discord.js');
require('dotenv').config();

// create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS]});

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

client.on('guildMemberAdd', async (member, Discord) => {
    console.log(member);

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
})

client.on('guildMemberRemove', async (member, Discord) => {
    console.log(member);

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
});

// login to discord
client.login(process.env.BOT_TOKEN);
