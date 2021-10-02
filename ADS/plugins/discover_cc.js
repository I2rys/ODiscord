//Main
function self(message){
    const is_discover_cc = message.content.match(/^6(?:011|5\d\d)(| |-)(?:\d{4}\1){2}\d{4}$/gm)

    if(is_discover_cc){
        console.log(`Discover cc found: ${is_discover_cc.toString().replace(",", ", ")}`)
    }
}

//Exporter
module.exports = {
    self: self
}
