const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
	.setName('add')
	.setDescription('add two numbers')
	.addNumberOption(option =>
		option.setName('first')
			.setDescription('first number')
			.setRequired(true)
    )
    .addNumberOption(option =>
		option.setName('second')
			.setDescription('second number')
			.setRequired(true)
    ),
    async execute(interaction) {
        await interaction.reply('wait... adding');
        let num1 = interaction.options.getNumber('num1');
        let num2 = interaction.options.getNumber('num2');
        let sum = num1 + num2;
        await interaction.followUp(`${num1} + ${num2} = ${sum}`);
    }
}