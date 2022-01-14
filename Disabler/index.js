const fetch = require('node-fetch');
const chalk = require('chalk');

const error = chalk.bold.red;
const warning = chalk.keyword('orange');
const success = chalk.keyword('green');
const info = chalk.keyword('lightblue');
const Self_Args = process.argv.slice(2);

if (!Self_Args.length) {
    console.log(info("node index.js <discord_token>"));
    process.exit();
}

if (!/^(mfa\.[a-z0-9_-]{20,})|([a-z0-9_-]{23,28}\.[a-z0-9_-]{6,7}\.[a-z0-9_-]{27})$/i.test(Self_Args[0])) {
    console.log(error("You provided an invalid Discord token"));
    process.exit();
}

fetch("https://discord.com/api/v9/users/@me", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "authorization": Self_Args[0],
    "content-type": "application/json",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-debug-options": "bugReporterEnabled",
  },
  "referrer": "https://discord.com/channels/@me",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"bio\":\"disabled!\"}",
  "method": "PATCH",
  "mode": "cors"
}).then(res => {
    console.log(info(`After making the request, the response code is now ${res.status}`));
    return console.log(warning('Run this script again to check the updated response code.'));
});