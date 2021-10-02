//Dependencies
const Discord = require("discord.js-selfbot-v11")
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)

const Plugins = Fs.readdirSync("./plugins", "utf8")

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
    console.log(`AIO Discord sniper is running.`)
})

User.on("message", (message)=>{
    for( i in Plugins ){
        require(`./plugins/${Plugins[i]}`).self(message, Self_Args[0])
    }
})

User.login(Self_Args[0])
