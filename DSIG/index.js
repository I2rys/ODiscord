//Dependencies
const Axios = require("axios")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(!Self_Args.length){
    console.log("node index.js <discord_token> <guild_id>")
    process.exit()
}

if(!Self_Args[1]){
    console.log("Invalid guild_id.")
    process.exit()
}

if(isNaN(Self_Args[1])){
    console.log("guild_id is not a number.")
    process.exit()
}

void async function Main(){
    try{
        console.log("Grabbing the server information, please wait.")
        var guild = await Axios({
            method: "GET",
            url: `https://discord.com/api/v6/guilds/${Self_Args[1]}`,
            headers: {
                authorization: Self_Args[0]
            }
        })
    
        guild = guild.data
    
        console.log(`
Server icon: https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png
Server splash: ${guild.splash}
Server discovery splash: ${guild.discovery_splash}
Server id: ${guild.id}
Server name: ${guild.name}
Server description: ${guild.description}
Server vanity: ${guild.vanity_url_code}
Server owner id: ${guild.owner_id}
Server verification level: ${guild.verification_level}
Server emojis amount: ${guild.emojis.length}
Server stickers amount: ${guild.stickers.length}
Server roles amount: ${guild.roles.length}

Finished!`)
    }catch{
        console.log("Invalid discord_token/guild_id.")
        process.exit()
    }
}()
