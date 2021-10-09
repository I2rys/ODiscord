//Dependencies
const Discord = require("discord.js-selfbot-v11")
const Request = require("request")
const Chalk = require("chalk")

//Variables
const Self_Args = process.argv.slice(2)

const User = new Discord.Client()

//Main
if(Self_Args.length == 0){
    console.log(`node index.js <discord_token>
Example: node index.js MYsEcReTtOkEn`)
    process.exit()
}

if(Self_Args[0] == ""){
    console.log(Chalk.red("Invalid Discord Token!"))
    process.exit()
}

User.on("ready", ()=>{
    console.log(Chalk.greenBright(`Discord nitro sniper is running.`))
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
                    console.log(Chalk.red(`Unable to redeem nitro code:${Chalk.white} ${code}`))
                    return
                }

                if(body.indexOf("redeemed already") != -1){
                    console.log(Chalk.red(`Nitro code:${Chalk.white} ${code} ${Chalk.red}is already redeemed.`))
                }else if(body.indexOf("nitro") != -1){
                    console.log(Chalk.greenBright(`Nitro code:${Chalk.white} ${code} ${Chalk.greenBright}claimed.`))
                }else{
                    console.log(Chalk.red(`Unknown nitro code:${Chalk.white} ${code}.`))
                }
            })
        }catch{}
    }
})

User.login(Self_Args[0])
