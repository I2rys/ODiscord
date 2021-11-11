//Dependencies
const Random_UserAgent = require("random-useragent")
const Discord_Nitro = require("discordnitro")
const Request = require("request")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(!Self_Args.length){
    console.log("node index.js <checking_speed(Milliseconds)> <discord_token>")
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
    console.log("Invalid discord_token.")
    process.exit()
}

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

                Request(`https://discordapp.com/api/v6/entitlements/gift-codes/${code}/redeem`, {
                    headers: {
                        "Authorization": Self_Args[1]
                    }
                }, function(err, res, body){
                    if(err){
                        console.log(Chalk.red(`Unable to redeem nitro ${code}`))
                        return
                    }
    
                    if(body.indexOf("redeemed already") != -1){
                        console.log(Chalk.red(`Nitro code ${code} is already redeemed.`))
                    }else if(body.indexOf("nitro") != -1){
                        console.log(Chalk.greenBright(`Nitro code ${code} claimed.`))
                    }else{
                        console.log(Chalk.red(`Unknown nitro code ${code}`))
                    }
                })
            }else{
                console.log(`Invalid nitro code: ${code}`)
            }
        }catch{
            console.log(`Invalid nitro code: ${code}`)
        }
    })
}, Self_Args[0])
