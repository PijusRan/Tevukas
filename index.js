require('dotenv').config();
const {Client, IntentsBitField, ActivityType, EmbedBuilder, GuildMember, ButtonBuilder, ActionRowBuilder, ButtonStyle} = require('discord.js');
const {Player} = require("discord-player")
const schedule = require('node-schedule')

//ERROR
process.on('uncaughtException', function(error) {
    console.error('Error:', error);
});

//KOMANDOS
const SLASHcommands = require("./Commands/slash_commands");
const MSGcommands = require("./Commands/msg_commands");
const Blackjack = require("./Commands/blackjack")

const fs = require('fs');

//CLIENT
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates
    ]
});
const player = new Player(client);

//READY
client.on('ready', (c) => {
    //console.log(client)
    console.log(`${c.user.username} V1.4.1`);

    client.user.setActivity({
        type: ActivityType.Watching,
        name: "žuvytes 🐟",
        url: 'https://youtu.be/8gA8we0RI8U'
    });

    /*const job = schedule.scheduleJob('* * * * 0', function(){
        let ts = Date.now();
        let date = ts.getDate();

        fs.writeFileSync('./Commands/Users.json', "{}");
        console.log("Taškai perstatyti: " + date);
    });*/
})



//MESSAGES
client.on('messageCreate', (msg) => {
    //AŠ
    MSGcommands.As(msg, client);
    //NEREK
    MSGcommands.Nerek(msg, client);
    //DIDZIUOJUOS
    MSGcommands.Didziuojuos(msg);

})

//KOMANDOS
client.on('interactionCreate', (interaction) => {
    guild_name = interaction.guild.name;

    if (!interaction.isChatInputCommand()) return;
    try{
        //HELP
        SLASHcommands.padek(interaction);
        //BAJERIUKAS
        SLASHcommands.bajeriukas(interaction);
        //ATSIBODA
        SLASHcommands.atsiboda(interaction);
        //REP_CHECk
        SLASHcommands.reputacij(interaction);
        //BLACKJACK
        Blackjack(client, interaction);
        //LEADERBOARD
        SLASHcommands.topas(interaction);
        //BALIUKAS
        SLASHcommands.baliukas(client, interaction, player);
    }
    catch(e){
        console.log(e);
        interaction.reply("Ups... Kažkas nepaėja. 😬")
    }

    
})



client.login(process.env.TOKEN);