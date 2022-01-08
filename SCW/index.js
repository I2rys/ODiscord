//Dependencies
const fetch = require("node-fetch");
const chalk = require('chalk');

//Variables you do not need to touch
const error = chalk.bold.red;
const warning = chalk.keyword('orange');
const success = chalk.keyword('green');
const Self_Args = process.argv.slice(2);

//Variables you can touch
const webhookName = "Captain Hook"; // this is the webhook name, you can change it to whatever you want

//Main
if(!Self_Args.length){
    console.log("node index.js <discord_token> <channel_id> <amount>");
    process.exit();
}

if (!/(mfa\.[a-z0-9_-]{20,})|([a-z0-9_-]{23,28}\.[a-z0-9_-]{6,7}\.[a-z0-9_-]{27})/i.test(Self_Args[0])) {
    console.log(error("You provided an invalid Discord token"));
    process.exit();
}

if(!/^[0-9]{18}$/.test(Self_Args[1])){
    console.log(error("You didn't provide a valid channel ID"));
    process.exit();
}

if(Self_Args[2] <= 0 || isNaN(Self_Args[2])){
    console.log(error("You provided an invalid amount."));
    process.exit();
}

let amount = Self_Args[2];
makeWebhooks(amount);

async function makeWebhooks(i) {
    if(i == 0){
        console.log(success("Finished creating webhooks."));
        process.exit();
    }
    
    fetch(`https://discordapp.com/api/v6/channels/${Self_Args[1]}/webhooks`, {
        method: "GET",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/5361 (KHTML, like Gecko) Chrome/39.0.898.0 Mobile Safari/5361",
            "Content-Type": "application/json",
            "Authorization": Self_Args[0]
        }
    }).then(res => res.json()).then(data => {
        if (data.length == 10) {
            console.log(error("You have reached the maximum amount of webhooks for this channel."));
            process.exit();
        } else {
            console.log(warning(`You are ${10 - data.length} away from the maximum amount of webhooks for this channel.`));
            fetch(`https://discord.com/api/v9/channels/${Self_Args[1]}/webhooks`, {
                method: "POST",
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/5361 (KHTML, like Gecko) Chrome/39.0.898.0 Mobile Safari/5361",
                    "Content-Type": "application/json",
                    "Authorization": Self_Args[0]
                },
                body: JSON.stringify({ name: webhookName })
            }).then(res => {
                console.log(res.status);
                switch (res.status) {
                    case 200:
                        i--;
                        console.log(warning(`Webhooks left to create: ${i}`));
                        makeWebhooks(i);
                        break;
                    case 429:
                        console.log(error("You have exceeded the rate limit. Please wait a few minutes and try again."));
                        process.exit();
                    case 400:
                        console.log(error("The request was malformed."));
                        process.exit();
                    default:
                        console.log(error(`Something went wrong with the status code ${res.status}. Please try again.`));
                        process.exit();
                }
            }).catch(console.error());
        }
    });
}
