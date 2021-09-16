//Dependencies
const JSON_Hood = require("json-hood")
const Request = require("request")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(Self_Args.length == 0){
    console.log(`node index.js <discord_server_invite_code>
Example: node index.js discord_server_invite_code_here`)
    process.exit()
}

if(Self_Args[0] === ""){
    console.log("Invalid discord_server_invite_code.")
    process.exit()
}

Request(`https://discord.com/api/v9/invites/${Self_Args[0]}?with_counts=true`, function(err, res, body){
    if(err){
        console.log("Something went wrong while requesting to Discord API please try again later.")
        process.exit()
    }

    body = JSON.parse(body)

    JSON_Hood.printJSONasArrowDiagram(body)
})
