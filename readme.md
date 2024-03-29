# discord bot

start creating a discord bot

* create a client & login to discord with token
* register commands (read [deploy-commands.js](./deploy-commands.js) file)
* come back to `app.js` and add a listener for these commands.
```js
client.on('interactionCreate', async interaction => {
    // send back reply or something.
});
```
Here `interaction` is like a request from discord by bot when user interacts with it (runs a command).

>  more info on guild object [here](https://discord.js.org/#/docs/main/stable/class/Guild)

---

*   when user interacts with bot or something, discord emits an event.
    these events are handled by our application.

    as there can be many events, we will handle them in seperate file.

    it's similar to command handling.

*   File [deploy-commands.js](./deploy-commands.js) register commands using it to the discord server.
    
*   File [register-commands.js](./tools/register-commands.js) will add commands of `commands` folder to the bot (client) as a collection.



---

## useful

* list of all discord.js events [gist](https://gist.github.com/koad/316b265a91d933fd1b62dddfcc3ff584)

* mongodb to bot [tutorial](https://www.youtube.com/watch?v=a3Gz_7KEJkQ)