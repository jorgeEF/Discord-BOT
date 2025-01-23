// Importa la librería Discord.js
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
require('dotenv').config();

const token = process.env.BOT_TOKEN;
const clientId = process.env.DISCORD_APP_ID;
const guildId = process.env.DISCORD_SERVER_ID;

if (!token || !clientId || !guildId) {
    console.error('Error: Faltan variables de entorno BOT_TOKEN, DISCORD_APP_ID o DISCORD_SERVER_ID.');
    process.exit(1);
}

// Crea una instancia del cliente de Discord
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Definición slash commands
const commands = [
    {
        name: 'ping',
        description: 'Responde con Pong!',
    },
    {
        name: 'info',
        description: 'Obtén información sobre el bot.',
    },
    {
        name: 'avatar',
        description: 'Muestra tu avatar o el de otro usuario.',
        options: [
            {
                name: 'usuario',
                type: 6, // USER
                description: 'El usuario cuyo avatar deseas ver.',
                required: false,
            },
        ],
    },
];

// Registra los comandos en el servidor
const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Actualizando los slash commands...');
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: commands,
        });
        console.log('¡Slash commands registrados exitosamente!');
    } catch (error) {
        console.error(error);
    }
})();

// Evento cuando el bot está listo
client.once('ready', () => {
    console.log(`¡Conectado como ${client.user.tag}!`);
});

// Manejo de eventos cuando se usan slash commands
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('🏓 Pong!');
    } else if (commandName === 'info') {
        await interaction.reply(`🤖 ¡Hola! Soy el bot de ${interaction.client.user.tag}.`);
    } else if (commandName === 'avatar') {
        const user = options.getUser('usuario') || interaction.user;
        await interaction.reply(`🖼️ Aquí está el avatar de ${user.username}: ${user.displayAvatarURL({ dynamic: true, size: 1024 })}`);
    }
});

// Evento cuando alguien envía un mensaje
client.on('messageCreate', message => {
    // Evita que el bot responda a sus propios mensajes
    if (message.author.bot) return;

    const displayName = message.member ? message.member.displayName : message.author.username;

    // Comandos simples
    if (message.content.toLowerCase() === 'hola' || message.content.toLowerCase() === 'buenas') {
        message.reply(`¡Hola ${displayName}! Bienvenid@ a El Confín Gaming!`);
    }    

    if (message.content.toLowerCase() === 'chau' || message.content.toLowerCase() === 'nos vemos') {
        message.reply(`Chau ${displayName}, hasta luego!`);
    }
    
});

// Inicia sesión con el token del bot
client.login(token);
