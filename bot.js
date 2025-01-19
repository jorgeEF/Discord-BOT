// Importa la librería Discord.js
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const token = process.env.BOT_TOKEN;

// Crea una instancia del cliente de Discord
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Evento cuando el bot está listo
client.once('ready', () => {
    console.log(`¡Conectado como ${client.user.tag}!`);
});

// Evento cuando alguien envía un mensaje
client.on('messageCreate', message => {
    // Evita que el bot responda a sus propios mensajes
    if (message.author.bot) return;

    // Comandos simples
    if (message.content === '!hola') {
        message.reply('¡Hola! ¿Cómo estás?');
    }

    if (message.content === '!adios') {
        message.reply('¡Adiós! Nos vemos luego.');
    }
});

// Inicia sesión con el token del bot
client.login(token);
