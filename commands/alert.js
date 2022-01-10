// alert command for the memmbers to either subscribe or unsubscribe for getting alerts
const { SlashCommandBuilder } = require("@discordjs/builders");
const Subscriber = require("../schemas/subscriber");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("alert")
        .setDescription("Replies with info that user wants!")
        .addSubcommand(subcommand =>
            subcommand
                .setName("subscribe")
                .setDescription("Subscribes the members to the alerts")
                .addStringOption(option =>
                    option
                        .setName("category")
                        .setDescription("Category of the alert to subscribe to")
                        .setRequired(true)
                        .addChoices([["Bot-Testing", "bot-testing"], ["Developer", "developer"]])))
                        // .addChoices([["Anime", "ANIME"], ["Manga", "MANGA"], ["Songs", "SONGS"]])))
        .addSubcommand(subcommand =>
            subcommand
                .setName("unsubscribe")
                .setDescription("Unsubscribes the user to the alerts")
                .addStringOption(option =>
                    option
                        .setName("category")
                        .setDescription("Category of the alert to unsubscribe from")
                        .setRequired(true)
                        .addChoices([["Bot-Testing", "bot-testing"], ["Developer", "developer"]])))
                        // .addChoices([["Anime", "ANIME"], ["Manga", "MANGA"], ["Songs", "SONGS"]])))
        .addSubcommand(subcommand =>
            subcommand
                .setName("status")
                .setDescription("Shows the status of the your alerts"))
    ,
    execute: async (interaction) => {
        try {
            const user = interaction.user;
            const subscriber = await Subscriber.findOne({ userId: user.id });
            if (interaction.options.getSubcommand() === "subscribe") {
                const category = interaction.options.getString("category");
                if (category) {
                    //  if the user is subscriber,
                    if (subscriber) {
                        //  if the user already subscribed to the category, then just return
                        if (subscriber.categories.includes(category)) {
                            interaction.reply("You are already subscribed to this category!");
                        } 
                        //  if the user already has a subscriber, add the category to the subscriber
                        else {
                            // const subscriber = subscriber.categories.push(category);
                            subscriber.categories.push(category);
                            await subscriber.save();
                            interaction.reply("You have subscribed to this category!");
                        }
                    } 
                    // create new subscriber and add the category to the subscriber
                    else {
                        const subscriber = new Subscriber({
                            userId: user.id,
                            categories: [category]
                        });
                        await subscriber.save();
                        interaction.reply(`You are now subscribed to ${category} alerts`);
                    }
                } else {
                    interaction.reply("Please specify a category!");
                }
            }
            else if (interaction.options.getSubcommand() === "unsubscribe") {
                const category = interaction.options.getString("category");
                if (category) {
                    //  if the user is subscriber,
                    if (subscriber) {
                        //  if the user haven't subscribed to this category, then just return
                        if (!subscriber.categories.includes(category)) {
                            interaction.reply("lol, You are not even subscribed to this category!");
                        }
                        //  if the user already has a subscriber, remove the category from the subscriber
                        else {
                            subscriber.categories.pull(category);
                            await subscriber.save();
                            //  if unscribing from last category, then delete the subscriber
                            if (subscriber.categories.length === 0) {
                                await Subscriber.deleteOne({ userId: user.id });
                            }
                            interaction.reply(`You are now unsubscribed from ${category} alerts`);
                        }
                    }
                    //  if the user is not subscriber, then just return
                    else {
                        interaction.reply("You are not subscribed to any category!");
                    }
                }
                else {
                    interaction.reply("Please specify a category!");
                }
            }
            else if (interaction.options.getSubcommand() === "status") {
                if (subscriber) {
                    interaction.reply(`You are subscribed to the following categories: ***${subscriber.categories.join(", ")}***`);
                } else {
                    interaction.reply("You are not subscribed to any category!");
                }
            }
        } catch (error) {
            console.log(error);
            interaction.reply({content: "Something went wrong! Please try again later!", ephemeral: true });
        }
    }
}
