const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//basic válasz megemlítéssel
client.on('message', msg => {
  if (msg.content === 'What is the meaning of the life?') {
    msg.reply('42');
  }
});

client.on('message', msg => {
  if (msg.content === 'asd') {
    msg.reply('( ͡° ͜ʖ ͡°)');
  }
});

//új tagot köszönti 
client.on('guildMemberAdd', member => {
  //''-között kell lennie a "betoppanónak" ahol köszönti őket, ha nem találja a megfelelő csatornát nem csinál semmmit
  const channel = member.guild.channels.find(ch => ch.name === 'entrance');
  if (!channel) return;
  channel.send(`Üdv itt, ${member} ( ͡° ͜ʖ ͡°) `);
  console.log(`New user connected: ${member}`);
});

//under development

//stream link:
	//a twitch közvetítés címe- webhook ? 
	var a = "Title";
	var b = "https://www.twitch.tv/wearethevr";
client.on("ready", () => {
	
    client.user.setActivity(a, { type: "STREAMING", url: b })
});

//a bot 'tag'-jei 
client.on("ready", () => {
    client.user.setPresence({
        game: { 
            name: '!help if u need me',
            type: 'PLAYING'
        },
        status: 'active'
    })
});

client.on("message", async message => {
	 if(message.author.bot) return;
	 if(message.content.indexOf(config.prefix) !== 0) return;
	 const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();


if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
}
//say parancs , leírja amit argumentumként kap  ( és ügyesen kitörli a parancsot, amivel utasítottuk)  
if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
} 
//help, megemlítéssel (a help üzenet a config.json-ban)
if(command ==="help"){
	var Helpmessage = config.help;
	message.reply('I am here, no worries');
	message.channel.send(Helpmessage);
}
//purge parancs , kitöröl megadott számú sort felfelé , max 100-ig
if(command === "purge") {
    // This command removes all messages from all users in the channel, up to 100.
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
});
var token = config.token;
client.login(process.env.BOT_TOKEN);
