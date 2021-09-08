//Dependencies
const Discord = require("discord.js-selfbot-v11")
const Delay = require("delay")

//Variables
const Self_Args = process.argv.slice(2)

const User = new Discord.Client()

var Payload = ""

//Functions
function Generate_NewLines(amount){
    var result = ""

    for( i = 0; i <= amount; i++ ){
        result += "\n"
    }

    return result
}


//Main
if(Self_Args.length == 0){
    console.log(`node index.js <discord_token> <newlines_amount> <spam_amount> <guild_id> <channel_id>
Example: node index.js yourwebhooklinkhere 1100 5 target_guild_id target_channel_id`)
    process.exit()
}

if(Self_Args[0] == ""){
    console.log("Invalid webhook_link.")
    process.exit()
}

if(Self_Args[1] == ""){
    console.log("Invalid newlines_amount.")
    process.exit()
}

if(isNaN(Self_Args[1])){
    console.log("spam_amount is not an Int.")
    process.exit()
}

if(Self_Args[2] == ""){
    console.log("Invalid spam_amount.")
    process.exit()
}

if(isNaN(Self_Args[2])){
    console.log("spam_amount is not an Int.")
    process.exit()
}

if(Self_Args[3] == ""){
    console.log("Invalid guild_id.")
    process.exit()
}

if(Self_Args[4] == ""){
    console.log("Invalid channel_id.")
    process.exit()
}

Payload = `\nLOL${Generate_NewLines(Self_Args[1])}LOL\n`

User.on("ready", ()=>{
    for( i = 0; i <= Self_Args[2]-1; i++ ){
        Send()
        async function Send(){
            User.guilds.find(guild => guild.id === Self_Args[3].toString()).channels.find(channel => channel.id === Self_Args[4].toString()).send(Payload).then(()=>{
                console.log("Payload sent.")

                if(i == Self_Args[2]){
                    console.log("Finished.")
                    process.exit()
                }
            }).catch(()=>{
                console.log("Unable to send payload, guild/channel id might be invalid or something went wrong with the API request.")

                if(i == Self_Args[2]){
                    console.log("Finished.")
                    process.exit()
                }
            })
        }
    }
})

User.login(Self_Args[0])
