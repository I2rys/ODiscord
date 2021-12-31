const fetch = require('node-fetch');
const token = "your_token";
if (!/(mfa\.[a-z0-9_-]{20,})|([a-z0-9_-]{23,28}\.[a-z0-9_-]{6,7}\.[a-z0-9_-]{27})/i.test(token)) {
    console.error('you did not provide a valid token');
    return process.exit(1);
}

fetch("https://discord.com/api/v9/users/@me/channels", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US",
    "authorization": token,
    "content-type": "application/json",
},
  "referrer": "https://discord.com/channels/@me",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
}).then(res => res.json()).then(json => {
    console.log(`fetched ${json.length} dm channels! sorting and leaving now...\n\n`);
    json.forEach(data => {
        if (data.type == 3) {
            fetch(`https://discord.com/api/v9/channels/${data.id}`, {
                "headers": {
                  "accept": "*/*",
                  "accept-language": "en-US,en;q=0.9",
                  "authorization": token,
                },
                "referrer": "https://discord.com/channels/@me",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": null,
                "method": "DELETE",
                "mode": "cors",
                "credentials": "include"
              }).then(res => {
                  switch (res.status) {
                        case 200:
                            console.log(`\nleft a group, group id: ${data.id}`);
                            break;
                        case 403:
                            console.log(`\nunauthorized, rerun this script with a new token`);
                            return process.exit(1);
                        case 429:
                            console.log(`\nrate limited!`);
                            break;
                  }
              })
        }
    });
});