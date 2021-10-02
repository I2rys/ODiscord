//Main
function self(message){
    const is_discord_token = message.content.match(/[\w-]{24}\.[\w-]{6}\.[\w-]{27}|mfa\.[\w-]{84}/g)

    if(is_discord_token){
        console.log(`Discord token/tokens found: ${is_discord_token.toString().replace(",", ", ")}`)
    }
}

//Exporter
module.exports = {
    self: self
}
