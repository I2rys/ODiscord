//Main
function self(message){
    var is_server_invite = message.content.match(/discord.com.[\w-]{8,}|discord.gg.[\w-]{8,}/g)

    if(is_server_invite){
        console.log(`Discord server invite/invites found: ${is_server_invite.toString().replace(",", ", ")}`)
    }
}

//Exporter
module.exports = {
    self: self
}
