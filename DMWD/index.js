//Dependencies
const Request = require("request")
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)

//Functions
function Initiate_A_Request(url){
    Request.delete(url, function(err, res, body){
        if(res.statusCode == 204){
            console.log(`Successfully deleted ${url}`)
        }else{
            console.log(`Failed to deleted ${url}`)
        }
    })
}

//Main
if(!Self_Args.length){
    console.log(`node index.js <input>
Example: node index.js example_webhooks.txt`)
    process.exit()
}

if(!Self_Args[0]){
    console.log("Invalid input.")
    process.exit()
}

const Data = Fs.readFileSync(Self_Args[0], "utf8").split("\n")

for( i in Data ){
    Initiate_A_Request(Data[i])
}
