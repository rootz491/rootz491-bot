const path = require('path');
const fs = require('fs');
const cron = require('cron');
const { Client, Intents, Collection } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES] });

/*
* Adding Commands to Client */
client.commands = new Collection();
const cmdFolder = path.join(__dirname, 'commands');
// read all files in the commands directory (as each file is a command)
const commandFiles = fs.readdirSync(cmdFolder).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`${cmdFolder}/${file}`);
	// set new item in `commands` collection with key as command name and value as exported module.
	client.commands.set(command.data.name, command);
}

/*
* Handling Events */
// read all files in the events directory (as each file is an event)
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// login to discord
client.login(process.env.BOT_TOKEN);