const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Replies with info that user wants!')
        .addSubcommand(subcommand => 
            subcommand
                .setName('server')
                .setDescription('Info about a server'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Info about a user')
                .addUserOption(option => 
                    option
                        .setName('target')
                        .setDescription('The user')))
    ,
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'server') {
            const server = interaction.guild;
            await interaction.reply(`Server name: ${server}\nServer ID: ${server.id}\nServer members: ${server.memberCount}`);
        } 
        else if (interaction.options.getSubcommand() === 'user') {
            const user = interaction.options.getUser('target');
            if (user) {
                console.log(user);
                await interaction.reply(`Username: ${user.tag}\nUser ID: ${user.id}`);
            }
            else
                await interaction.reply(`Your User Name: ${interaction.user.username}\nYour User ID: ${interaction.user.id}`);
        }
    }
}
