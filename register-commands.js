require('dotenv').config();
const {REST, Routes, ApplicationCommandOptionType} = require('discord.js');

const commands = [
    {
        name: 'bajeriuka',
        description: 'Ė tėvuka, šauk vieno',
    },
    {
        name: 'atsiboda',
        description: 'Pašauk tėvo, nes atsiboda pacans...',
        options: [{
            name: 'kas_toks',
            description: 'Ko išmest von, nuo stala',
            type: ApplicationCommandOptionType.User,
            required: true
        }]
    },
    {
        name: 'reputacij',
        description: 'Reputacija pri tivuko',
        options: [{
            name: 'kieno',
            description: 'Kieno rep',
            type: ApplicationCommandOptionType.User,
            required: false
        }]
    },
    {
        name: 'pls-rep',
        description: 'Tėvuka, dok reputacijos'
    },
    {
        name: 'topas',
        description: 'Pas ko didžiaus reputacij?'
    },
    {
        name: 'baliukas',
        description: 'Tėvukai, muzikos prašyčiau'
    },
    {
        name: 'padėk',
        description: "Tėvuka, ką moki?"
    }
]

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try{
        console.log("Registering slash commands...");

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            {body: commands}
        );

        console.log("Done!");

    } catch (error) {
        console.log(error);
    }
})();