//Dependencies
const Axios = require("axios")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(!Self_Args.length){
    console.log("node index.js <user_id> <discord_token>")
    process.exit()
}

if(isNaN(Self_Args[0])){
    console.log("user_id is not a number.")
    process.exit()
}

if(!Self_Args[1]){
    console.log("Invalid discord_token.")
    process.exit()
}

void async function Main(){
    try{
        var response = await Axios({
            method: "GET",
            url: `https://discord.com/api/v9/users/${Self_Args[0]}/profile?with_mutual_guilds=false`,
            headers: {
                authorization: Self_Args[1]
            }
        })

        user = response.data.user
        ca = response.data.connected_accounts

        console.log(`
Username: ${user.username}
ID: ${user.id}
Tag: ${user.username}#${user.discriminator}
Tag number: ${user.discriminator}
BIO: ${user.bio}
`)

        for( i in ca ){
            console.log(`Platform: ${ca[i].type}
Name: ${ca[i].name}
ID: ${ca[i].id}
Verified: ${ca[i].verified}
`)
        }
    }catch{
        console.log("Make sure user_id & discord_token is valid.")
    }
}()
