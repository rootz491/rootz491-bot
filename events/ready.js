const path = require('path');
const fs = require('fs');
const { Collection } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);

        const cmdFolder = path.join(__dirname, '/../commands');
        
        // TODO: fix these commands, not working!
        client.commands = new Collection();
        // read all files in the commands directory (as each file is a command)
        const commandFiles = fs.readdirSync(cmdFolder).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`${cmdFolder}/${file}`);
            // set new item in `commands` collection with key as command name and value as exported module.
            client.commands.set(command.name, command);
        }

        // console.log(client.commands);
    }
}