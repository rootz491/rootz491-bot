const Quiz = require('../schemas/quiz');
const { SlashCommandBuilder } = require("@discordjs/builders");
const { default: axios } = require("axios");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const Math = require("mathjs");

module.exports = {
    data: new SlashCommandBuilder()
                .setName("quiz")
                .setDescription("Quizes are fun, so let's play one")
                .addSubcommand(subcommand => 
                    subcommand
                        .setName("play")
                        .setDescription("Start a quiz"))
                .addSubcommand(subcommand =>
                    subcommand
                        .setName("rules")
                        .setDescription("Rules for the quiz"))
                .addSubcommand(subcommand =>
                    subcommand
                        .setName("score")
                        .setDescription("View your current score"))
                .addSubcommand(subcommand =>
                    subcommand
                        .setName("reset")
                        .setDescription("Reset your current score"))
                .addSubcommand(subcommand =>
                    subcommand
                        .setName("leaderboard")
                        .setDescription("View the leaderboard"))
    ,
    execute: async (interaction) => {
        const API = 'https://opentdb.com/api.php?amount=1&category=31&difficulty=easy&type=multiple'
        // fetch questions from API
        const res = await axios(API);
        const question = await res.data.results[0];
        const subcommand = interaction.options.getSubcommand();
        const userId = interaction.user.id;
        let user = await Quiz.findOne({ userId });

        switch (subcommand) {
            // play the game
            case "play":
                let win = false;
                if (!user) {
                    user = new Quiz({
                        userId,
                    });
                }
                const randomNumber = Math.floor(Math.random() * 3);
                question.incorrect_answers[randomNumber] = question.correct_answer;
                //  replace a shenanigans
                question.question = question.question.replace(/&#039;/g, "'");
                question.question = question.question.replace(/&quot;/g, '"');
                question.incorrect_answers.forEach((ans, i) => {
                    question.incorrect_answers[i] = ans.replace(/&#039;/g, "'");
                    question.incorrect_answers[i] = ans.replace(/&quot;/g, '"');
                });
                //  adding embed Message
                const msg = new MessageEmbed({
                    title: 'Quiz',
                    description: "> quiz will end in 15 seconds automatically.\n\n\n"+question.question,
                    color: "RANDOM",
                });
                //  adding buttons
                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('o1')
                            .setLabel(question.incorrect_answers[0].toString())
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('o2')
                            .setLabel(question.incorrect_answers[1].toString())
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('o3')
                            .setLabel(question.incorrect_answers[2].toString())
                            .setStyle('SECONDARY'))
                //  sending the message
                await interaction.reply({ embeds: [msg], components: [row], ephemeral: true });
                //  handling the buttons
                const filter = (m) => m.member.id === interaction.user.id;

                //  creating a collector
                const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15 * 1000, max: 1 });
                //  listening button clicks
                collector.on('collect', async m => {
                    if (m.component.label === question.correct_answer.toString()) {
                        win = true;
                        interaction.editReply({ content: 'Correct! \nYou just earned 1 point!', components: [], embeds: [], ephemeral: true });
                    } else {
                        interaction.editReply({ content: 'Wrong!\n But don`t give up 😊', components: [], embeds: [], ephemeral: true });
                    }
                });
                //  end of collector
                collector.on('end', async collection => {
                    user.total++;
                    if (collection.size === 0)
                        interaction.editReply({ content: 'Time out!', components: [], embeds: [], ephemeral: true });
                    if (win) user.win++;
                    await user.save();
                });
                break;
            // show scores
            case "score":
                if (!user) {
                    interaction.reply({ content: 'You have no score yet!', components: [], embeds: [], ephemeral: true });
                } else {
                    interaction.reply({ content: `Your current score is ${user.win}/${user.total}`, components: [], embeds: [], ephemeral: true });
                }   
                break;
            //  reset score in database
            case "reset":
                if (!user) {
                    interaction.reply({ content: 'You have no score yet!', components: [], embeds: [], ephemeral: true });
                } else {
                    await user.delete();
                    interaction.reply({ content: 'Your score has been reset!', components: [], embeds: [], ephemeral: true });
                }
                break;
            // show leaderboard
            case "leaderboard":
                const users = await Quiz.find({}).sort({ win: -1, total: 1 });
                let leaderboard = '';
                users.forEach((user, i) => {
                    let username = i === 0 ? `<@${user.userId}> 👑` : `<@${user.userId}>`;
                    leaderboard += `${i + 1}. ${username} - ${user.win}/${user.total}\n\n`;

                });
                const leaderboardEmbed = new MessageEmbed({
                    title: 'Leaderboard',
                    description: leaderboard,
                    color: "RANDOM",
                });
                interaction.reply({ embeds: [leaderboardEmbed], components: [] });
                break;
            case "rules":
                let ruleEmbed = new MessageEmbed({
                    title: 'Rules for Quiz',
                    description: '1. quiz will **timeout** in 15 seconds automatically\n\n2.For each win, you\'ll get 1 point\n\n3. As you start a game, i\'ll count as an attempt.\n'
                });
                interaction.reply({ embeds: [ruleEmbed], components: [], ephemeral: true });
                break;
            default:
                interaction.reply("Invalid subcommand");
                break;
        }
    }
}