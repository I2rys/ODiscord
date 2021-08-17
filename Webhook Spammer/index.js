//Dependencies
const Discord = require("discord.js")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(Self_Args.length == 0){
    console.log(`node index.js <webhook_link> <message_to_spam>
node index.js notsofastlol :P`)
    process.exit()
}

if(Self_Args[0] == ""){
    console.log("Invalid webhook link.")
    process.exit()
}

if(Self_Args[0].indexOf("discord.com/api/webhooks") == -1){
    console.log("Invalid webhook link.")
    process.exit()
}

if(Self_Args[1] == ""){
    console.log("Invalid message to spam.")
    process.exit()
}

const Reconstruct_WL = Self_Args[0].split("/")
const Webhook_ID = Reconstruct_WL[5]
const Webhook_Token = Reconstruct_WL[6]

const Webhook = new Discord.WebhookClient(Webhook_ID, Webhook_Token)
var Message = ""

for( i in Self_Args.slice(1) ){
    if(Message.length == 0){
        Message = Self_Args.slice(1)[i]
    }else{
        Message += ` ${Self_Args.slice(1)[i]}`
    }

    if(i == Self_Args.slice(1).length-1){
        Launch()
    }
}

function Launch(){
    console.log("Spammer has been launched!")

    setInterval(function(){
        Webhook.send(Message)
    }, 100)
}
