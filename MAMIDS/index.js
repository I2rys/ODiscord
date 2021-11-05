//Dependencies
const Discord = require("discord.js-selfbot")

//Variables
const Self_Args = process.argv.slice(2)
const User = new Discord.Client()

//Main
if(!Self_Args.length){
    console.log("node index.js <discord_token>")
    process.exit()
}

if(!Self_Args[0]){
    console.log("Invalid discord_token.")
    process.exit()
}

User.on("ready", ()=>{ 
    console.log("Selfbot is running!")
})

User.on("message", (message)=>{
    const message_args = message.content.split(" ")

    if(message.author.id == User.user.id){
        if(message_args[0] == "M$messageall"){
            message.delete()
            message.guild.members.cache.forEach(member =>{
                member.send(message_args.slice(1).join(" ")).then(()=>{
                    console.log(`Successfully sent the message to this user ${member.user.tag}`)
                }).catch(()=>{
                    console.log(`Failed to send the message to this user ${member.user.tag}`)
                })
            })
        }
    }
})

User.login(Self_Args[0]).catch(()=>{
    console.log("Invalid discord_token.")
    process.exit()
})
