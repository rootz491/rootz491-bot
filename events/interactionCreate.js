module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isCommand()) return;
        // get command from `commands` collection based on the command name
        console.log(interaction.commandName);
        const command = interaction.client.commands.get(interaction.commandName);
        // console.log('command: ', command);
        if(!command) return;
        // execute the command
        try {
            await command.execute(interaction);
        } catch (error) {
            console.log(error);
            await interaction.reply({ content: 'There was an error trying to execute that command!', ephemeral: true });
        }
    }
}