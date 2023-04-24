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
    console.log(`${c.user.username} V1.3`);
})

schedule.scheduleJob('0 0 1 * *', () => {
    const date = new Date();
    const day = date.getDay();
    console.log(day);
    switch (day){
        case 0:
            console.log("Sekmadienis")
            client.user.setActivity({
                type: ActivityType.Listening,
                name: "kunigo ✝",
                url: 'https://youtu.be/8gA8we0RI8U'
            });
        case 1:
            console.log("Pirmadienis")
            client.user.setActivity({
                type: ActivityType.Playing,
                name: "su rezultatais 📈",
                url: "https://www.youtube.com/watch?v=8gA8we0RI8U"
            });
        case 2:
            console.log("Antradienis")
            client.user.setActivity({
                type: ActivityType.Playing,
                name: "darbe ⚒",
                url: "https://www.youtube.com/watch?v=8gA8we0RI8U"
            });
        case 3:
            console.log("Treciadienis")
            client.user.setActivity({
                type: ActivityType.Playing,
                name: "su savim 😏",
                url: "https://www.youtube.com/watch?v=8gA8we0RI8U"
            });
        case 4:
            console.log("Ketvirtadienis")
            client.user.setActivity({
                type: ActivityType.Streaming,
                name: "geriausią YT video",
                url: "https://www.youtube.com/watch?v=8gA8we0RI8U"
            });
        case 5:
            console.log("Penktadienis")
            client.user.setActivity({
                type: ActivityType.Listening,
                name: "klubiake 💿",
                url: 'https://youtu.be/8gA8we0RI8U'
            });
        case 6:
            console.log("Sestadienis")
            client.user.setActivity({
                type: ActivityType.Watching,
                name: "žuvytes 🐟",
                url: 'https://youtu.be/8gA8we0RI8U'
            });
    }
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
        //PLS REP
        SLASHcommands.pls_rep(interaction);
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