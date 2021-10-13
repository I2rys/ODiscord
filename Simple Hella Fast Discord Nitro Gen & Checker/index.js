//Dependencies
const Random_UserAgent = require("random-useragent")
const Discord_Nitro = require("discordnitro")
const Discord = require("discord.js")
const Request = require("request")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(!Self_Args.length){
    console.log(`node index.js <checking_speed(Milliseconds)> <webhook_link>
Example: node index.js 1000 yourwebhooklink`)
    process.exit()
}

if(!Self_Args[0]){
    console.log("Invalid checking_speed.")
    process.exit()
}

if(isNaN(Self_Args[0])){
    console.log("checking_speed is not an Int.")
    process.exit()
}

if(!Self_Args[1]){
    console.log("Invalid webhook_link.")
    process.exit()
}

const Webhook = new Discord.WebhookClient(Self_Args[1].split("/").length-2, Self_Args[1].split("/").length-1)

setInterval(function(){
    const code = Discord_Nitro(1)[0]

    Request(`https://discordapp.com/api/v9/entitlements/gift-codes/${code}?with_application=false&with_subscription_plan=true`, {
        headers: {
            "User-Agent": Random_UserAgent.getRandom()
        }
    }, function(err, res, body){
        if(err){
            console.log(`Invalid nitro code: ${code}`)
            return
        }

        try{
            if(res.statusCode == 200){
                console.log(`Valid nitro code: ${code}`)
                Webhook.send(`Valid nitro code: ${code}`)
            }else{
                console.log(`Invalid nitro code: ${code}`)
            }
        }catch{
            console.log(`Invalid nitro code: ${code}`)
        }
    })
}, Self_Args[0])
