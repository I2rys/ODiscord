//Main
function self(message){
    const is_american_express_cc = message.content.match(/^3[47]\d{13,14}$/gm)

    if(is_american_express_cc){
        console.log(`American express cc found: ${is_american_express_cc.toString().replace(",", ", ")}`)
    }
}

//Exporter
module.exports = {
    self: self
}
