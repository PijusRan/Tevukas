const {EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ComponentType} = require('discord.js');
const fs = require('fs');

//KORTOS
const k_vert = {"♣️1":1, "♣️2":2 , "♣️3":3 , "♣️4":4 , "♣️5":5 , "♣️6":6, "♣️7":7, "♣️8":8, "♣️9":9, "♣️J":10, "♣️Q":10, "♣️K":10, "♣️A":11,
                "♥️1":1, "♥️2":2 , "♥️3":3 , "♥️4":4 , "♥️5":5 , "♥️6":6, "♥️7":7, "♥️8":8, "♥️9":9, "♥️J":10, "♥️Q":10, "♥️K":10, "♥️A":11,
                "♦️1":1, "♦️2":2 , "♦️3":3 , "♦️4":4 , "♦️5":5 , "♦️6":6, "♦️7":7, "♦️8":8, "♦️9":9, "♦️J":10, "♦️Q":10, "♦️K":10, "♦️A":11,
                "♠️1":1, "♠️2":2 , "♠️3":3 , "♠️4":4 , "♠️5":5 , "♠️6":6, "♠️7":7, "♠️8":8, "♠️9":9, "♠️J":10, "♠️Q":10, "♠️K":10, "♠️A":11}
const kortos = Object.keys(k_vert);
function GK() { //Gauti Korta
   let K = Math.floor(Math.random() * 52);
   return kortos[K];
}
function s_k(kortos){
    let s = "";
    for (const k of kortos) {
        s += k + " ";
    }
    return s
}

//TUZO CHECK
function t_check(p_sum, p_k){
    if(p_sum > 21){
        if(p_k.findIndex((k) => k == "♣️A") != -1){
            p_k[p_k.findIndex((k) => k == "♣️A")] = "♣️1";
            return true;
        }
        else if(p_k.findIndex((k) => k == "♠️A") != -1){
            p_k[p_k.findIndex((k) => k == "♠️A")] = "♠️1";
            return true;
        }
        else if(p_k.findIndex((k) => k == "♥️A") != -1){
            p_k[p_k.findIndex((k) => k == "♥️A")] = "♥️1";
            return true;
        }
        else if(p_k.findIndex((k) => k == "♦️A") != -1){
            p_k[p_k.findIndex((k) => k == "♦️A")] = "♦️1";
            return true;
        }
    }
    else{
        return false;
    }
}

//PLAYING PHASE
function playing_phase_embed(bet, p_k){
    const buttons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('hit')
            .setLabel("HIT")
            .setStyle(ButtonStyle.Primary)
        )
        .addComponents(
            new ButtonBuilder()
            .setCustomId('stand')
            .setLabel("STAND")
            .setStyle(ButtonStyle.Primary)
        )
        .addComponents(
            new ButtonBuilder()
            .setCustomId('dd')
            .setLabel("DOUBLE DOWN")
            .setStyle(ButtonStyle.Primary)
        )
    
    const embed = new EmbedBuilder()
        .setTitle("Juods Džeks🍀")
        .setDescription("Nu davai, pažaidžiam!")
        .addFields(
        {
            name: "Tu žaidi už",
            value: (bet + " rep. 🎖")
        },
        { 
            name: 'Tavo kortos',
            value: s_k(p_k)
        },
        {
            name: "Tėvo kortos",
            value: "❔ ❔"
        }
        )
    
    return {embeds: [embed], components: [buttons]}
}

//PLAYER BUST
function bust_embed(bet, p_k){
    const embed = new EmbedBuilder()
    .setTitle("BUS TAU! GOBŠUS...")
    .setDescription("Pralaimėjai " + bet + " 🎖")
    .addFields({
        name: "Tavo kortos buvo",
        value: s_k(p_k)
    })
    return {embeds: [embed], components: []}
}

//TEVAS


//TEVAS BUST
function tevasbust_embed(d_k, p_k, bet){

    const embed = new EmbedBuilder()
    .setTitle("Laimėjai!")
    .setDescription("Tėvas bust'ino😏 \n Laimėjai " + bet + " 🎖")
    .addFields({
        name: "Tavo kortos buvo",
        value: s_k(p_k)
    })
    .addFields({
        name: "Tėvo kortos buvo",
        value: s_k(d_k)
    })
    return {embeds: [embed], components: []}
}

//LYGINIMAS
function lyginimas_phase(p_k, d_k, p_sum, d_sum, bet){
    if(p_sum > d_sum){
        const embed = new EmbedBuilder()
            .setTitle("Laimėjai!")
            .setDescription("Nusišypsojo sėkmė! \n Laimėjai " + bet + " 🎖")
            .addFields({
                name: "Tavo kortos buvo",
                value: s_k(p_k)
            })
            .addFields({
                name: "Tėvo kortos buvo",
                value: s_k(d_k)
            })
        return [1, {embeds: [embed], components: []}]
    }
    else if(p_sum < d_sum){
        const embed = new EmbedBuilder()
            .setTitle("Pralaimėjai...")
            .setDescription("Išmok žaist. \n Pralaimėjai " + bet + " 🎖")
            .addFields({
                name: "Tavo kortos buvo",
                value: s_k(p_k)
            })
            .addFields({
                name: "Tėvo kortos buvo",
                value: s_k(d_k)
            })

        return [2, {embeds: [embed], components: []}]
    }
    else{
        const embed = new EmbedBuilder()
            .setTitle("Lygiosios.")
            .setDescription("Surinkom po tiek pat. \n Negavai 🎖")
            .addFields({
                name: "Tavo kortos buvo",
                value: s_k(p_k)
            })
            .addFields({
                name: "Tėvo kortos buvo",
                value: s_k(d_k)
            })
        return [3, {embeds: [embed], components: []}]
    }
}

//MAIN
async function juods_dzeks(client, interaction){
    if (interaction.commandName == "juods-dzeks"){
        //tevas
        function tevas_phase(){
            while(d_sum < 17){
                d_k.push(GK());
                d_sum += k_vert[d_k[d_k.length-1]];
        
                //♥️♦️♠️♣️
        
                if(d_sum > 21){
                    if(d_k.findIndex((k) => {return k == "♣️A"}) != -1){
                        d_k[d_k.findIndex((k) => {return k == "♣️A"})] = "♣️1";
                        d_sum -= 10;
                    }
                    else if(d_k.findIndex((k) => {return k == "♠️A"}) != -1){
        
                        d_k[d_k.findIndex((k) => {return k == "♠️A"})] = "♠️1";
                        d_sum -= 10; 
                    }
                    else if(d_k.findIndex((k) => {return k == "♥️A"}) != -1){
                        d_k[d_k.findIndex((k) => {return k == "♥️A"})] = "♥️1";
                        d_sum -= 10;
                    }
                    else if(d_k.findIndex((k) => {return k == "♦️A"}) != -1){
                        d_k[d_k.findIndex((k) => {return k == "♦️A"})] = "♦️1";
                        d_sum -= 10;
                    }
                    else{
                        return 'bust';
                    }
                }
            }
            if(d_sum <= 21){
                return 'stand';
            }
        }  

        //JSON failas
        const data = JSON.parse(fs.readFileSync('./Commands/Users.json'))
        const p_id = interaction.member.id
        if(!data[p_id]){
            data[p_id] = 50;
        }

        //statymas
        let bet = interaction.options.get('statymas').value;
        if(bet > data[p_id]){
            interaction.reply("Neturi tiek reputacijos. Įvesk mažesnę sumą, abaly.")
            return;
        }
        else if(bet < 0){
            interaction.reply("Tu esi vienas didelis minusas.")
            return;
        }

        //tevo kortos
        let d_k = [GK(), GK()]; 
        let d_sum = k_vert[d_k[0]] + k_vert[d_k[1]];

        //zaidejo kortos
        let p_k = [GK(), GK()];
        let p_sum = k_vert[p_k[0]] + k_vert[p_k[1]];

        //zaidimo pradzia

        const game_start = await interaction.reply(playing_phase_embed(bet, p_k));
        const filter = (i) => i.user.id === interaction.user.id;
        
        const collector = game_start.createMessageComponentCollector({
            ComponentType: ComponentType.Button,
            filter
        });

        collector.on('collect', (b) => {
            if(b.customId == 'hit'){

                p_k.push(GK());
                p_sum += k_vert[p_k[(p_k.length-1)]];
                if(t_check(p_sum, p_k, bet)) {p_sum -= 10}
                
                if(p_sum <= 21){
                    interaction.editReply(playing_phase_embed(bet, p_k));
                    b.deferUpdate();
                }
                else{
                    interaction.editReply(bust_embed(bet, p_k));
                    atimt(bet, p_id);
                    return;
                }
            }
            //DOUBLE DOWN
            else if(b.customId == 'dd'){

                bet *= 2;

                p_k.push(GK());
                p_sum += k_vert[p_k[(p_k.length-1)]];
                if(t_check(p_sum, p_k, bet)) {p_sum -= 10}
                
                if(p_sum > 21){
                    interaction.editReply(bust_embed(bet, p_k));
                    atimt();
                    return;
                }
                else{
                    phase2();
                    return;
                }
            }
            //STAND
            else if(b.customId == 'stand'){
                phase2();
                return;
            }
        })

        //tevo faze
        
        function phase2(){
            const t = tevas_phase();
            let l = [0, {}];

            if(t == 'bust'){
                interaction.editReply(tevasbust_embed(d_k, p_k, bet));
                pridet();
            }
            else if(t == 'stand'){
                l = lyginimas_phase(p_k, d_k, p_sum, d_sum, bet);
            }
            
            interaction.editReply(l[1])
            if(l[0] == 1){
                pridet();
            }
            else if(l[0] == 2){
                atimt();
            }
        }

        //pridet-atimt
        function pridet(){
            data[p_id] = data[p_id] + bet;
            fs.writeFileSync('./Commands/Users.json', JSON.stringify(data))
        }
        function atimt(){
            data[p_id] -= bet;
            if(data[p_id] <= 0) data[p_id] = 50;
            fs.writeFileSync('./Commands/Users.json', JSON.stringify(data))
        }

        

        return;

    }
}




module.exports = (juods_dzeks);