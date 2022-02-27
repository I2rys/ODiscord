//Dependencies
const Axios = require("axios")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if (!Self_Args.length) {
    console.log("node index.js <user_id> <discord_token>")
    process.exit()
}

if (isNaN(Self_Args[0])) {
    console.log("user_id is not a number.")
    process.exit()
}

if (!/(mfa\.[a-z0-9_-]{20,})|([a-z0-9_-]{23,28}\.[a-z0-9_-]{6,7}\.[a-z0-9_-]{27})/i.test(Self_Args[1])) {
    console.error('you did not provide a valid token');
    process.exit(1);
}

void async function Main() {
    try {
        const response = await Axios({
            method: "GET",
            url: `https://discord.com/api/v9/users/${Self_Args[0]}/profile`,
            headers: {
                authorization: `${Self_Args[1]}`
            }
        })

        const user = response.data.user
        const ca = response.data.connected_accounts

        console.log(`
Username: ${user.username}
ID: ${user.id}
Tag: ${user.username}#${user.discriminator}
Tag number: ${user.discriminator}
BIO: ${user.bio}
`)

        for (i in ca) {
            console.log(`Platform: ${ca[i].type}
Name: ${ca[i].name}
ID: ${ca[i].id}
Verified: ${ca[i].verified}
`)
        }
    } catch (e) {
        console.log("Make sure user_id & discord_token is valid. If the provided information is valid, then that means that Discord is preventing you from viewing the profile of this user. This is most likely because you are trying to view the profile of a user that you haven't interacted with.\nError:", e.response.data)
    }
}()
