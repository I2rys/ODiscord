//Dependencies
const Axios = require("axios")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(!Self_Args.length){
    console.log("node index.js <discord_token> <channel_id> <amount>")
    process.exit()
}

if(isNaN(Self_Args[1])){
    console.log("channel_id is not a number.")
    process.exit()
}

if(isNaN(Self_Args[2])){
    console.log("amount is not a number.")
    process.exit()
}

var create_index = 0

Create()
async function Create(){
    if(create_index == Self_Args[2]){
        console.log("Finished creating webhooks.")
        process.exit()
    }

    try{
        const response = await Axios({
            method: "POST",
            url: `https://discord.com/api/v9/channels/${Self_Args[1]}/webhooks`,
            headers: {
                "content-type": "application/json",
                authorization: Self_Args[0]
            },
            data: { name: "Captain Hook" }
        })

        console.log(`Successfully created a  webhook in index ${create_index}`)
        create_index++
        return Create()
    }catch{
        console.log(`Failed to create webhook in index ${create_index}`)
        return Create()
    }
}
