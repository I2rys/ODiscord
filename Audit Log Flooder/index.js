//Dependencies
const Request = require("request")
const Delay = require("delay")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(Self_Args.length == 0){
    console.log(`node index.js <channel_id> <discord_token> <amount>
Example: node index.js channel_id discord_token 10`)
    process.exit()
}

if(Self_Args[0] == ""){
    console.log("Invalid channel_id.")
    process.exit()
}

if(isNaN(Self_Args[0])){
    console.log("channel_id is not an Int.")
    process.exit()
}

if(Self_Args[1] == ""){
    console.log("Invalid discord_token.")
    process.exit()
}

if(Self_Args[2] == ""){
    console.log("Invalid amount.")
    process.exit()
}

if(isNaN(Self_Args[2])){
    console.log("amount is not an Int.")
    process.exit()
}

for( i = 0; i <= Self_Args[2]-1; i++ ){
    Spam()
}

var self_index = 1

async function Spam(){
    await Delay(2000)

    Request.post(`https://discord.com/api/v9/channels/${Self_Args[0]}/invites`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": Self_Args[1]
        },
        body: JSON.stringify({ "max_age": Math.floor(Math.random() * 604800), "max_uses": 0, "temporary": false })
    }, function(err, res, body){
        if(body.indexOf("Unknown Channel") != -1){
            console.log("Invalid channel_id.")
            process.exit
        }

        if(body.indexOf("You are being rate limited.") != -1){
            Spam()
            return
        }

        console.log(`Done! Index: ${self_index}`)

        self_index += 1
    })
}
