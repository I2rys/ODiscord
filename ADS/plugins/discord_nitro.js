//Dependencies
const Request = require("request")

//Main
function self(message, token){
    if(message.content.indexOf("discord.gift") != -1 || message.content.indexOf(".com/gift") != -1){
        try{
            const code = message.content.split("/")[message.content.split("/").length-1]

            console.log(`Discord nitro code found ${code}`)

            Request.post(`https://discordapp.com/api/v6/entitlements/gift-codes/${code}/redeem`, {
                headers: {
                    "Authorization": token
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
}

//Exporter
module.exports = {
    self: self
}
