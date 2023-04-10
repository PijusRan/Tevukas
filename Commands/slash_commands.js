const fs = require('fs');
const {EmbedBuilder, GuildMember, ButtonBuilder, ActionRowBuilder, ButtonStyle} = require('discord.js');

function getRandomInt(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
      )
}

//HELP
function padek(interaction){
    if(interaction.commandName == 'padėk'){
        const embed = new EmbedBuilder()
        .setTitle("TĖVUKAS GALI")
        .setColor(0x0099FF)
        .setAuthor({name: "Frustikas", iconURL: 'https://yt3.googleusercontent.com/bxD-kfZ5L8wcxV_6YYW6q52E8_lAqiUe8H5OW0UXROurXS_aPUNuJoNN998hwOT-TRlxPyCWlQ=s176-c-k-c0x00ffffff-no-rj', url: 'https://www.youtube.com/channel/UCSitjPoPzEkG3U0jX4WN2Ig'})
        .setImage('https://cdn.discordapp.com/avatars/1079347205435047986/5f96f5184962bac5bc47a8bd2572e961.png?size=256')
        .setThumbnail('https://cdn.discordapp.com/app-assets/1079347205435047986/1079349222018654229.png')
        .addFields(
            {name: '/bajeriuka', value: 'Tėvukas žina gerų bajeriukų', inline: true},
            {name: '/atsiboda', value: 'Nuvaris ano nuo kūčių stala', inline: true},
            {name: '/baliukas', value: 'Tėvukas žina, kas yra ger muzik', inline: true}
        )
        .addFields(
            {name: '/reputacij', value: 'Kas tur kiek reputacijos', inline: true},
            {name: '/pls-rep', value: 'Gal tėvuks duos reputacijas', inline: true},
            {name: '/topas', value: 'Paflexink!', inline: true},
        )
        .addFields(
            {name: 'Prisistatyk', value: 'Pasakyk "aš", prisistatys ir tėvukas!', inline: true},
            {name: 'Nerėk', value: 'Parėksi, gausi velnių', inline: true},
            {name: 'Status', value: 'Pažėk to videko!', inline: true}
        )
        interaction.reply({embeds: [embed]});
    }
}

//BAJERIUKAS
function bajeriukas(interaction){
    if (interaction.commandName == "bajeriuka"){
        let data = fs.readFileSync('./Commands/Bajeriukai.json');
    let Bajeriukai = (JSON.parse(data)).bajeriukai;
        interaction.reply(Bajeriukai[getRandomInt(0, Bajeriukai.length)])
    }
}

//ATSIBODA
function atsiboda(interaction){
    if (interaction.commandName == "atsiboda"){
        const tag = interaction.options.get('kas_toks');
        const chnl = interaction.channelId;
        
        interaction.reply(`Pyzdink, ${tag.member}, nuo stalo!`);
    }
}

//REPUTACIJA
function reputacij(interaction){
    if (interaction.commandName == "reputacij"){
        const data = JSON.parse(fs.readFileSync('./Commands/Users.json'))
        let id, tag;

        if(interaction.options.get('kieno')){
            tag = interaction.options.get('kieno').member.user;
            id = interaction.options.get('kieno').member.id;
        }
        else{
           tag = interaction.member.user;
           id= interaction.member.id;
        }
      if(!data[id]){
          data[id] = 50;
        }

       interaction.reply(`${tag} reputacij su tėvuku: ${data[id]} rep`)
      fs.writeFileSync('./Commands/Users.json', JSON.stringify(data))
    } 
}

//PLS_REP
function pls_rep(interaction){
    if (interaction.commandName == "pls-rep"){
        const data = JSON.parse(fs.readFileSync('./Commands/Users.json'))
        const id = interaction.member.id;

        if(!data[id]){
            data[id] = 50;
        }

        let rep = data[id]

        const n = getRandomInt(0,6);
        
        let add;
        let func = [
            //DIVIDE BY 3
            () => {
                rep = Math.round(rep/3);
                interaction.reply(`EIK TU NA***. REP / 3 \nDabar tava reputacij: ${rep}`)
            },
            //HALF
            () => {
                rep = Math.round(rep/2);
                interaction.reply(`Prisidirba vaikel. REP / 2 \nDabar tava reputacij: ${rep}`)
            },
            //MINUS >-30
            () => {
                add = getRandomInt(-10, -30);
                rep += add;
                if(rep < 0){
                    rep = 0;
                }
                interaction.reply(`Tuuuuuuu. REP ${add} \nDabar tava reputacij: ${rep}`)
            },
            //ADD <40
            () => {
                add = getRandomInt(10, 41)
                rep += add;
                interaction.reply(`Nu gera gera. REP + ${add} \nDabar tava reputacij: ${rep}`)
            },
            //ADD
            () => {
                add = 50
                rep += add;
                interaction.reply(`Patink tu man. REP + ${add} \nDabar tava reputacij: ${rep}`)
            },
            //TIMES 2
            () => {
                rep = rep * 4;
                interaction.reply(`Seniiiiiiiiii. REP x4 \nDabar tava reputacij: ${rep}`)
            }
        ]

        func[n]()

        data[id] = rep;
        fs.writeFileSync('./Commands/Users.json', JSON.stringify(data))
    }
}

//TOPAS
function topas(interaction){
    if(interaction.commandName == 'topas'){
        //GET ARRAY OF MEMBERS IN SERVER
        async function get_members(){
            const member_fetch = await interaction.guild.members.fetch();
            let members = [];
            for await(el of member_fetch){
                members.push(el[0])
            }
            return members
        }

        //FILTER ARRAY
        async function filter_members(get_members){
            const rep_data = JSON.parse(fs.readFileSync('./Commands/Users.json'));
            const members = await get_members()
            
            for (const key in rep_data) {
                if(!members.includes(key)){
                    delete rep_data[key];
                }
            }

            return rep_data
        }

        //SORT ARRAY
        async function sort_array(filter_members){
            const rep_data = await filter_members(get_members)
            let arr = [];

            Object.entries(rep_data).forEach((entry) => {
                const [id, rep] = entry;
                arr.push({id, rep})
            });

            arr = arr.sort((a,b) => {
                if(a.rep > b.rep){return -1}
            })

            return arr
        }

        //USERNAMES - EMBED
        async function get_username(id){
            let name;
            const member = await interaction.guild.members.fetch(id);
            name = member.user;
            return name;
        }
        
        async function create_list(filter_members, get_username) {
            const arr = await sort_array(filter_members)
            let rep_s = '';

            if(arr.length >= 5){
                for(let i = 0; i < 5; i++){
                    const username = await get_username(arr[i].id);
                    rep_s +=`${i+1}. ${username}: ${arr[i].rep} \n`;
                }
            }
            else{
                for(let i = 0; i < arr.length; i++){
                    const username = await get_username(arr[i].id);
                    rep_s +=`${i+1}. ${username}: ${arr[i].rep} \n`;
                }
            }

            return rep_s
        }

        //REPLY
        async function reply(filter_members, create_list, get_username, arr){
            const rep_s = await create_list(filter_members, get_username, arr);

            const top_embed = new EmbedBuilder()
                .setTitle('Tėvuko Reputacijos Top')
                .setDescription('Kas tur daugiausia reputacijos su tėvuku?')
                .setColor('#FFD700')
                .addFields({
                    name:'🏆',
                    value: rep_s
                })

            interaction.reply({ embeds: [top_embed] });
        }

        //CALL
        reply(filter_members, create_list, get_username)
        
    }
}

//BALIUKAS
const {Player, useQueue, QueryTypem, useHistory} = require("discord-player")
function music_embed(interaction){
    const queue = useQueue(interaction.guild.id);

    //BUTTONS
    const buttons = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setCustomId('music-back')
        .setEmoji('⏮')
        .setStyle(ButtonStyle.Secondary)
    )
    .addComponents(
        new ButtonBuilder()
        .setCustomId('music-playpause')
        .setEmoji('⏯')
        .setStyle(ButtonStyle.Secondary)
    )
    .addComponents(
        new ButtonBuilder()
        .setCustomId('music-forward')
        .setEmoji('⏭')
        .setStyle(ButtonStyle.Secondary)
    )
    const embed = new EmbedBuilder()
        .setTitle("Dabar groja:")
        .setDescription(`${queue.currentTrack.title}`)
        .setImage(queue.currentTrack.thumbnail)

    return({embeds: [embed], components: [buttons]})
    
}
function baliukas(client, interaction, player, guild_name){
    if(interaction.commandName == 'baliukas'){
        async function play(interaction, YoutubeExtractor){
            interaction.deferReply();

            //PLAYER
            const { YouTubeExtractor } = require('@discord-player/extractor')
            const { useMasterPlayer } = require("discord-player");
            const player = useMasterPlayer();

            //CHECK VC
            vc = await interaction.member.voice.channel;
            if (!vc){
                await interaction.reply("Pirm prisijunk pri kanala, obuoly")
            }

            //PLAY
            const query = await player.search('https://youtube.com/playlist?list=PLwEpUrvMUDePDXnw68jCs8Che58ePxwJ5', {
                searchEngine: YoutubeExtractor
            });
            try {
                const {track} = await player.play(interaction.member.voice.channel, query);
                const queue = await useQueue(interaction.guild.id);
                queue.tracks.shuffle();
                queue.node.skip();
                playing = true;
            } catch(e) {
                interaction.followUp(`Problema: ${e}`);
            }

            //ON SONG START
            player.events.on('playerStart', () => {
                console.time('Daina pasikeitė')
                interaction.followUp(music_embed(interaction))
                console.timeEnd('Daina pasikeitė')
            });

            //BUTTON FUNCTIONS
            client.on('interactionCreate', interaction => {
                if(interaction.customId == 'music-back'){
                    const queue = useQueue(interaction.guild.id);
                    const history = useHistory(interaction.guild.id);
                    history.previous();
                    interaction.deferUpdate();
                }
                if(interaction.customId == 'music-playpause'){
                    const queue = useQueue(interaction.guild.id);    
                    queue.node.setPaused(!queue.node.isPaused());
            
                    if (playing){
                        playing = false;
                    } 
                    else{
                        playing = true;
                    }
            
                    interaction.deferUpdate();
                }
                if(interaction.customId == 'music-forward'){
                    const queue = useQueue(interaction.guild.id);
                    queue.node.skip();
                    interaction.deferUpdate();
                }
            });
        }

        play(interaction)
    }

}


module.exports = {bajeriukas, atsiboda, reputacij, pls_rep, topas, baliukas, padek};