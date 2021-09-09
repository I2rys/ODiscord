//Dependencies
const ProXie = require("./index")

//Main
Main()
async function Main(){
    await ProXie.init()
    console.log(ProXie.get())
}
