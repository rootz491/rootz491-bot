const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const wait = require('util').promisify(setTimeout);

module.exports = {
    data: new SlashCommandBuilder()
                .setName("hackerone")
                .setDescription("provides easy access to hackerone")
                .addSubcommand(subcommand =>
                    subcommand
                        .setName("report") 
                        .setDescription("access h1 report[s]")
                        .addStringOption(option =>
                            option
                                .setName("program")
                                .setDescription("program name")
                                .setRequired(true)
                                .addChoices([["Shopify", "shopify"]])))
    ,
    execute: async (interaction) => {
        const program = interaction.options.getString("program");
        try {
            if (program) {
                //  fetch hackerone reports
                interaction.editReply(`you have requested to see the ${program} report`);
            }
        } catch (error) {
            
        }
    }
}