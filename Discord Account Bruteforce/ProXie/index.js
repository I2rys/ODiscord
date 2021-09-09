//Dependencies
const Request = require("request")
const Fs = require("fs")

//Main
async function init(){
    const Proxies = Fs.readFileSync(`${__dirname}/proxies.txt`, "utf8")

    return new Promise(resolve =>{
        Request("https://api.proxyscrape.com/v2/?request=displayproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all", function(err, res, body){
            if(err){
                resolve()
                return
            }
    
            var results = ""
    
            body = body.split("\n")
    
            for( i in body ){
                if(Proxies.indexOf(body[i]) == -1){
                    if(results.length == 0){
                        results = body[i]
                    }else{
                        results += `\n${body[i]}`
                    }
                }
            }

            if(Proxies.length == 0){
                Fs.writeFileSync(`${__dirname}/proxies.txt`, results, "utf8")
            }else{
                Fs.writeFileSync(`${__dirname}/proxies.txt`, `${Proxies}\n${results}`, "utf8")
            }

            resolve()
        })
    })
}

function get(){
    var Proxies = Fs.readFileSync(`${__dirname}/proxies.txt`, "utf8").split("\n")

    Proxies = JSON.parse(JSON.stringify(Proxies).replace(/\\r/g, ""))

    return Proxies
}

//Exporter
module.exports = {
    init: init,
    get: get
}
