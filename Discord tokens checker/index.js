//Dependencies
const Request = require("request")
const Delay = require("delay")
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(!Self_Args.length){
    console.log(`node index.js <input>
Example: node index.js ex_discord_tokens.txt`)
    process.exit()
}

if(!Self_Args[0]){
    console.log("Invalid input.")
    process.exit()
}

const discord_tokens = Fs.readFileSync(Self_Args[0], "utf8").split("\n")

if(!discord_tokens.length){
    console.log("It looks like the input(discord tokens) you specified is empty.")
    process.exit()
}

var dt_index = 0

Loop()
async function Loop(){
    if(dt_index == discord_tokens.length){
        console.log("Done!")
        process.exit()
    }

    await Delay(100)

    Request("https://discord.com/api/v6/auth/login", {
        headers: {
            "Authorization": discord_tokens[dt_index]
        }
    }, function(err, res, body){
        if(err){}
            
        try{
            if(res.statusCode == 200){
                console.log(`Valid token: ${discord_tokens[dt_index]}`)
            }else{
                console.log(`Invalid token: ${discord_tokens[dt_index]}`)
            }
        }catch{
            console.log(`Invalid token: ${discord_tokens[dt_index]}`)  
        }

        dt_index += 1

        Loop()
    })
}
