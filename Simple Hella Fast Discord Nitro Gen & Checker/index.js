//Dependencies
const Discord_Nitro = require("discordnitro")
const Discord = require("discord.js")
const Request = require("request")
const Chalk = require("chalk")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(Self_Args.length == 0){
    console.log(`node index.js <checking_speed(Milliseconds)> <webhook_link>
Example: node index.js 1000 yourawesomewebhook`)
    process.exit()
}

if(Self_Args[0] == ""){
    console.log(Chalk.red("Invalid checking_speed."))
    process.exit()
}

if(isNaN(Self_Args[0])){
    console.log(Chalk.red("checking_speed is not an Int."))
    process.exit()
}

if(Self_Args[1] == ""){
    console.log(Chalk.RED("Invalid webhook_link."))
    process.exit()
}

const Webhook = new Discord.WebhookClient(Self_Args[1].split("/").length-2, Self_Args[1].split("/").length-1)

setInterval(function(){
    const code = Discord_Nitro(1)[0]

    Request(`https://discordapp.com/api/v9/entitlements/gift-codes/${code}?with_application=false&with_subscription_plan=true`, function(err, res, body){
        if(err){
            console.log(Chalk.red(`Invalid nitro code: ${code}`))
            return
        }

        try{
            if(res.statusCode == 200){
                console.log(Chalk.greenBright(`Valid nitro code: ${code}`))
                Webhook.send(`I Found a Valid Nitro! @everyone: ${code}`)
            }else{
                console.log(Chalk.red(`Invalid nitro code: ${code}`))
            }
        }catch{
            console.log(Chalk.red(`Invalid nitro code: ${code}`))
        }
    })
}, Self_Args[0])
