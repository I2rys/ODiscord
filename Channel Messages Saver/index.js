//Dependencies
const Request = require("request")
const Delay = require("delay")
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)

var results = ""

//Main
if(Self_Args.length == 0){
    console.log("node index.js <channel_id> <amount> <output> <discord_token>")
    process.exit()
}

if(!Self_Args[0]){
    console.log("Invalid channel_id.")
    process.exit()
}

if(isNaN(Self_Args[0])){
    console.log("channel_id is not an Int.")
    process.exit()
}

if(!Self_Args[1]){
    console.log("Invalid amount.")
    process.exit()
}

if(isNaN(Self_Args[1])){
    console.log("amount is not an Int.")
    process.exit()
}

if(!Self_Args[2]){
    console.log("Invalid output.")
    process.exit()
}

if(!Self_Args[3]){
    console.log("Invalid discord_token.")
    process.exit()
}

Main()
function Main(){
    var max = 0
    var last_message_id = null
    var old_amount = 0
    var new_amount = parseInt(Self_Args[1])
    var before_message_id = 0

    console.log("Fetching messages has started, this might take a while depends.")
    Is_In_Limit()
    async function Is_In_Limit(reput){
        await Delay(10)

        if(new_amount == 0 && old_amount == 0){
            console.log("Saving...")
            Fs.writeFileSync(Self_Args[2], results, "utf8")
            console.log("Done.")
            process.exit()
        }

        if(reput){
            new_amount = old_amount
            old_amount = 0
            Is_In_Limit()
            return
        }

        if(new_amount > 100){
            old_amount += Math.floor(new_amount/5)
            new_amount -= Math.floor(new_amount/5)

            Is_In_Limit()
            return
        }

        Messages()
    }

    function Messages(){
        if(before_message_id == 0){
            Request(`https://discord.com/api/v9/channels/${Self_Args[0]}/messages?limit=${new_amount}`, {
                headers: {
                    "Authorization": Self_Args[3]
                }
            }, function(err, res, body){
                if(err){
                    console.log(er)
                    process.exit()
                }

                if(body == "[]"){
                    console.log("No messages found in the channel.")
                    process.exit()
                }else{
                    body = JSON.parse(body)

                    for( i in body ){
                        if(i == body.length-1){
                            before_message_id = body[i].id
                        }

                        try{
                            if(!results.length){
                                results = `[${body[i].author.username}#${body[i].author.discriminator}][${body[i].author.id}][${body[i].timestamp}] ${body[i].content}`
                            }else{
                                results += `\n[${body[i].author.username}#${body[i].author.discriminator}][${body[i].author.id}][${body[i].timestamp}] ${body[i].content}`
                            }
                        }catch{}

                        if(i == body.length){
                            before_message_id = body[i].id
                        }
                    }

                    if(new_amount != 0){
                        Is_In_Limit(true)
                        return
                    }
                }
            })
        }else{
            Request(`https://discord.com/api/v9/channels/${Self_Args[0]}/messages?before=${before_message_id}&limit=${new_amount}`, {
                headers: {
                    "Authorization": Self_Args[3]
                }
            }, function(err, res, body){
                if(err){
                    console.log(err)
                    process.exit()
                }

                if(body == "[]"){
                    console.log("No messages found in the channel.")
                    process.exit()
                }else{
                    body = JSON.parse(body)

                    for( i in body ){
                        if(i == body.length-2){
                            before_message_id = body[i].id
                        }

                        try{
                            if(!results.length){
                                results = `[${body[i].author.username}#${body[i].author.discriminator}][${body[i].author.id}][${body[i].timestamp}] ${body[i].content}`
                            }else{
                                results += `\n[${body[i].author.username}#${body[i].author.discriminator}][${body[i].author.id}][${body[i].timestamp}] ${body[i].content}`
                            }
                        }catch{}
                    }

                    if(new_amount != 0){
                        Is_In_Limit(true)
                        return
                    }
                }
            })
        }
    }
}
