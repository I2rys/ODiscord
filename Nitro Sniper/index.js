//Dependencies
const Discord = require("discord.js-selfbot-v11")
const Request = require("request")

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
    console.log(`Discord nitro sniper is running.`)
})

User.on("message", (message)=>{
    if(message.content.indexOf("discord.gift") != -1 || message.content.indexOf(".com/gift") != -1){
        try{
            const code = message.content.split("/")[message.content.split("/").length-1]

            Request.get(`https://discordapp.com/api/v6/entitlements/gift-codes/${code}/redeem`, {
                headers: {
                    "Authorization": Self_Args[0]
                }
            }, function(err, res, body){
                if(err){
                    console.log(`Unable to radeem nitro code ${code}`)
                    return
                }

                if(body.indexOf("radeemed already") != -1){
                    console.log(`Nitro code ${code} is already radeemed.`)
                }else if(body.indexOf("nitro") != -1){
                    console.log(`Nitro code ${code} claimed.`)
                }else{
                    console.log(`Unknown nitro code ${code}.`)
                }
            })
        }catch{}
    }
})

User.login(Self_Args[0])
