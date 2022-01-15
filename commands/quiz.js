const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
                .setName("quiz")
                .setDescription("Quizes are fun, so let's play one"),
    execute: async (interaction) => {

        // adding buttons
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('start')
                    .setLabel('Start')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('help')
                    .setLabel('Help')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('leaderboard')
                    .setLabel('Leaderboard')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('score')
                    .setLabel('Score')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('cancel')
                    .setLabel('Cancel')
                    .setStyle('DANGER')
            );

        // adding embed Message
        const msg = new MessageEmbed({
            title: 'Quiz',
            description: 'Welcome to the quiz\nQuiz will have 5 questions with timelimit of 10 seconds per question.\n',
            fields: [
                {
                    name: 'Start',
                    value: 'Start a quiz',
                    inline: true
                },
                {
                    name: 'Help',
                    value: 'View the help',
                    inline: true
                },
                {
                    name: 'Leaderboard',
                    value: 'View the leaderboard',
                    inline: true
                },
                {
                    name: 'Score',
                    value: 'View your score',
                    inline: true
                }
            ]
        });

        // sending the message
        await interaction.reply({ contents: 'yey quiz!', embeds: [msg], components: [row] });

        // handling the buttons
        const filter = (m) => m.member.id === interaction.user.id;

        // creating a collector
        // const collector = interaction.channel.createMessageComponentCollector​({ filter, time: 10000 });
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000 });

        // listening event
        collector.on('collect', m => {
            const btn = m.component.customId;
            switch (btn) {
                case 'start':
                    interaction.reply('Starting quiz');
                    break;
                case 'help':
                    interaction.reply('Help');
                    break;
                case 'leaderboard':
                    interaction.reply('Leaderboard');
                    break;
                case 'score':
                    interaction.reply('Score');
                    break;
                case 'cancel':
                    //  cancel the collector
                    collector.stop();
                    break;
            }
        });

        collector.on('end', collection => {
            console.log(`Collected ${collection.size} interactions.`);
            interaction.editReply({ content: 'Quiz ended!', components: [] });
        });
    }
}