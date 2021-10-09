//Main
function self(message){
    const is_mastercard_cc = message.content.match(/^5[1-5]\d{2}(| |-)(?:\d{4}\1){2}\d{4}$/gm)

    if(is_mastercard_cc){
        console.log(`Mastercard cc found: ${is_mastercard_cc.toString().replace(",", ", ")}`)
    }
}

//Exporter
module.exports = {
    self: self
}
