function As(msg, client){
    if(((msg.content).substring(0,2)).toUpperCase() == "AŠ"
        && (msg.author.id) != (client.user.id)){
        obj = (msg.content).substring(2, (msg.content).length);
        msg.reply(`Labas, ${obj}, aš tėvas!`)
    }
    if(((msg.content).substring(0,2)).toUpperCase() == "AS"
        && (msg.author.id) != (client.user.id)){
        obj = (msg.content).substring(2, (msg.content).length);
        msg.reply(`Labas, ${obj}, aš tėvas!`)
    }
}

function Nerek(msg, client){
    if((msg.content) == (msg.content).toUpperCase() && 
        (msg.author.id) != (client.user.id) && 
        (msg.content).substring(0,2) != "XD" &&
        (msg.content).length > 3 &&
        (msg.content).match(/[a-zA-Z]/g)
        ){

        msg.reply(`NERĖK K#RVA!`)
    }
}

function Didziuojuos(msg){
    if((msg.content).toLowerCase() == "frustas mldc"){
        msg.reply("Aš didžiuojuosi tavim, sūnau.")
    }
}

module.exports = {As, Nerek, Didziuojuos};