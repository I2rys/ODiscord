//Dependencies
const Chokidar = require("chokidar")
const Os = require("os")
const Fs = require("fs")

//Startup
if(!Fs.existsSync(`C:\\Users\\${Os.userInfo().username}\\AppData\\Roaming\\discord`)){
    console.log("It seems like you don't have Discord installed in your PC.")
    process.exit()
}

//Variables
const Homedir = Os.userInfo().homedir

const Token_Protector = {
    directories_to_watch: [
        `${Homedir}\\AppData\\Roaming\\discord\\Local Storage\\leveldb`,
        `${Homedir}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Local Storage\\leveldb`,
        `${Homedir}\\twwtwtwt\\Local\\Google\\Chrome\\User Data\\Default\\Local Storage\\leveldb`
    ],
    discord_tokens_regex: new RegExp(/[\w-]{24}\.[\w-]{6}\.[\w-]{27}|mfa\.[\w-]{84}/, "g")
}

//Functions
Token_Protector.tokens_remover = function(file_path){
    Fs.readFile(file_path, "utf8", function(err, data){
        if(err){
            console.log(`Unable to read file ${file_path}`)
            return
        }

        if(data.match(Token_Protector.discord_tokens_regex)){
            console.log(`Tokens found in file ${file_path}`)
    
            data = data.replace(Token_Protector.discord_tokens_regex, "")
    
            Fs.writeFileSync(file_path, data, "utf8")
            console.log(`Tokens in file ${file_path} are removed.`)
        }else{
            console.log(`No tokens found in file ${file_path}`)
        }
    })
}

Token_Protector.watch_directory = function(directory_path){
    if(!Fs.existsSync(directory_path)){
        console.log(`Directory path ${directory_path} doesn't exist, therefore skipping the directory.`)
        return
    }

    console.log(`Watching directory ${directory_path}`)

    const directory_files = Fs.readdirSync(directory_path, "utf8")
    const directory_watcher = Chokidar.watch(directory_path, {
        awaitWriteFinish: true
    })

    directory_watcher.on("change", (path)=>{
        console.log(`Changes detected in file ${path}`)

        console.log(`Checking any tokens in file ${path}`)
        Token_Protector.tokens_remover(path)
    })

    console.log(`Checking directory ${directory_path} files for any tokens.`)
    for( i in directory_files ){
        Token_Protector.tokens_remover(`${directory_path}\\${directory_files[i]}`)
    }
}

//Main
for( i in Token_Protector.directories_to_watch ){
    Token_Protector.watch_directory(Token_Protector.directories_to_watch[i])
}
