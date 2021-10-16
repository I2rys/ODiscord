//Dependencies
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(!Self_Args.length){
    console.log(`node chopchop.js <input(Your code encoded in base64)>
Example: node chopchop.js input.txt`)
    process.exit()
}

if(!Self_Args[0]){
    console.log("Invalid input.")
    process.exit()
}

if(!Fs.existsSync(Self_Args[0])){
    console.log("Invalid input.")
    process.exit()
}

const File_Data = Fs.readFileSync(Self_Args[0], "utf8")
var result = ""

if(!File_Data){
    console.log("Input file data is empty.")
    process.exit()
}

for( i = 0; i <= File_Data.length-1; i++ ){
    if(!result.length){
        result = File_Data[i]
    }else{
        result += `\n${File_Data[i]}`
    }
}

Fs.writeFileSync("./assets/not_infected.txt", result, "utf8")
console.log("The data was successfully chop chop and saved to assets/not_infected.txt")
