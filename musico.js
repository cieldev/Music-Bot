
const { Collection, Intents, Client } = require("discord.js");
const { Player } = require("discord-player");
const db = require("quick.db");
const config = require("./musico.config");
const handleEvents = require("./handlers/eventsHandler");
const handleInteractions = require("./handlers/interactionHandlers");
const registrar = require("./handlers/registrar");
const handlePlayer = require("./handlers/playerEventsHandler")

const client = new Client({
	intents: [
		//yeah this sux
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_VOICE_STATES,
	],
});
/**
 * Global variables< Client and Player... etc.>
 */
const players = new Player(client);
client.slashCommands = new Collection();
client.contextCommands = new Collection();
client.db = db;
client.player = players;
client.config = config;
/**
 * Handle events , handle interactions and register commands
 */
handleEvents(client, `${__dirname}/events`);
handlePlayer(client, `${__dirname}/events/player`);
handleInteractions(client, __dirname);
registrar(client);
/**
 * Login to the bot
 */
client.login(client.config.botToken);
