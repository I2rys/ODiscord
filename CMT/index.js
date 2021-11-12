//Dependencies
const Request = require("request")
const Delay = require("delay")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(!Self_Args.length){
    console.log("node index.js <discord_token> <channel_id> <max> <thread_name>")
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
    console.log("Invalid max.")
    process.exit()
}

if(!Self_Args[3]){
    console.log("Invalid thread_name.")
    process.exit()
}

if(isNaN(Self_Args[2])){
    console.log("Max is not a valid Int.")
    process.exit()
}

var in_index = 0

Make()
function Make(){
    if(in_index == Self_Args[2]){
        console.log("Finished making threads.")
        process.exit()
    }

    Request.post(`https://discord.com/api/v9/channels/${Self_Args[1]}/threads`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": Self_Args[0]
        },
        body: JSON.stringify({"name": Self_Args.slice(3).join(" "),"type":11,"auto_archive_duration":1440,"location":"Thread Browser Toolbar"})
    }, async function(err, res, body){
        if(body.indexOf('"archived": false,') != -1){
            console.log("Created a thread.")
            in_index += 1
            Make()
            return
        }else{
            console.log("Unable to create a thread, retrying...")

            await Delay(1000)
            Make()
            return
        }
    })
}
