//Dependencies
const Request = require("request")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(!Self_Args.length){
    console.log(`node index.js <discord_token> <channel_id> <user_id> <message>
Example: Above me.`)
    process.exit()
}

if(!Self_Args[0]){
    console.log("Invalid discord_token.")
    process.exit()
}

if(!Self_Args[1]){
    console.log("Invalid channel_id.")
    process.exit()
}

if(!Self_Args[2]){
    console.log("Invalid user_id.")
    process.exit()
}

if(!Self_Args[3]){
    console.log("Invalid message.")
    process.exit()
}

var Payload = ""
Payload = `${Self_Args.slice(3).join(" ")}:sunglasses: ||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||||||||||<@${Self_Args[2]}>`

Request.post(`https://discordapp.com/api/v6/channels/${Self_Args[1]}/messages`, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": Self_Args[0]
    },
    body: JSON.stringify({ "content": Payload })
},function(err, res, body){
    if(err){
        console.log(err)
        process.exit()
    }

    console.log("Payload successfully sent.")
})
