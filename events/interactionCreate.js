module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction) {
        // console.log(interaction);
        if (!interaction.isCommand()) return;

        // get command from `commands` collection based on the command name
        console.log(interaction.client.commands)
        const command = interaction.client.commands.get(interaction.commandName);
    
        // console.log(command);
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