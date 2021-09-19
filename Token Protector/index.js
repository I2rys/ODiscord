//Dependencies
const Os = require("os")
const Fs = require("fs")

//Startup
if(!Fs.existsSync(`C:\\Users\\${Os.userInfo().username}\\AppData\\Roaming\\discord`)){
    console.log("It seems like you don't have Discord installed in your PC.")
    process.exit()
}

//Variables
const F_1 = Fs.readdirSync(`C:\\Users\\${Os.userInfo().username}\\AppData\\Roaming\\discord\\Local Storage\\leveldb`, { withFileTypes: true }).filter((file) => file.name.indexOf(".log") != -1)

//Main
console.log("Checking for tokens on startup.")
Fs.readFile(`C:\\Users\\${Os.userInfo().username}\\AppData\\Roaming\\discord\\Local Storage\\leveldb\\${F_1[0].name}`, "utf8", function(err, data){
    if(err){}
    var find_tokens = data.match(/mfa\.\w+|(?!B.)\w+\.\w+\.[a-z][A-Z]\w+.\w+/g)

    if(find_tokens != null){
        console.log(`Tokens found in C:\\Users\\${Os.userInfo().username}\\AppData\\Roaming\\discord\\Local Storage\\leveldb\\${F_1[0].name}`)
        data = data.replace(/mfa\.\w+|(?!B.)\w+\.\w+\.[a-z][A-Z]\w+.\w+/g, "")

        Fs.writeFileSync(`C:\\Users\\${Os.userInfo().username}\\AppData\\Roaming\\discord\\Local Storage\\leveldb\\${F_1[0].name}`, data, "utf8")
        console.log(`Tokens found in C:\\Users\\${Os.userInfo().username}\\AppData\\Roaming\\discord\\Local Storage\\leveldb\\${F_1[0].name} removed.`)
    }else{
        console.log(`No tokens found in C:\\Users\\${Os.userInfo().username}\\AppData\\Roaming\\discord\\Local Storage\\leveldb\\${F_1[0].name} idling...`)
    }
})

console.log("Monitoring Discord.")
console.log(`Monitoring: C:\\Users\\${Os.userInfo().username}\\AppData\\Roaming\\discord\\Local Storage\\leveldb\\${F_1[0].name}`)
Fs.watchFile(`C:\\Users\\${Os.userInfo().username}\\AppData\\Roaming\\discord\\Local Storage\\leveldb\\${F_1[0].name}`, function(cur, prev){
    console.log(`Change on C:\\Users\\${Os.userInfo().username}\\AppData\\Roaming\\discord\\Local Storage\\leveldb\\${F_1[0].name} detected.`)
    
    var data = Fs.readFileSync(`C:\\Users\\${Os.userInfo().username}\\AppData\\Roaming\\discord\\Local Storage\\leveldb\\${F_1[0].name}`, "utf8")
    var find_tokens = data.match(/mfa\.\w+|(?!B.)\w+\.\w+\.[a-z][A-Z]\w+.\w+/g)

    if(find_tokens != null){
        console.log(`Tokens found in C:\\Users\\${Os.userInfo().username}\\AppData\\Roaming\\discord\\Local Storage\\leveldb\\${F_1[0].name}`)
        data = data.replace(/mfa\.\w+|(?!B.)\w+\.\w+\.[a-z][A-Z]\w+.\w+/g, "")

        Fs.writeFileSync(`C:\\Users\\${Os.userInfo().username}\\AppData\\Roaming\\discord\\Local Storage\\leveldb\\${F_1[0].name}`, data, "utf8")
        console.log(`Tokens found in C:\\Users\\${Os.userInfo().username}\\AppData\\Roaming\\discord\\Local Storage\\leveldb\\${F_1[0].name} removed.`)
    }else{
        console.log(`No tokens found in C:\\Users\\${Os.userInfo().username}\\AppData\\Roaming\\discord\\Local Storage\\leveldb\\${F_1[0].name} idling...`)
    }
})

if(Fs.existsSync(`C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Local Storage\\leveldb`)){
    const F_2 = Fs.readdirSync(`C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Local Storage\\leveldb`, { withFileTypes: true }).filter((file) => file.name.indexOf(".log") != -1)

    Fs.readFile(`C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Local Storage\\leveldb\\${F_2[0].name}`, "utf8", function(err, data){
        if(err){}
    
        var find_tokens = data.match(/mfa\.\w+|(?!B.)\w+\.\w+\.[a-z][A-Z]\w+.\w+/g)
    
        if(find_tokens != null){
            console.log(`Tokens found in C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Local Storage\\leveldb\\${F_2[0].name}`)
            data = data.replace(/mfa\.\w+|(?!B.)\w+\.\w+\.[a-z][A-Z]\w+.\w+/g, "")
    
            Fs.writeFileSync(`C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Local Storage\\leveldb\\${F_2[0].name}`, data, "utf8")
            console.log(`Tokens found in C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Local Storage\\leveldb\\${F_2[0].name} removed.`)
        }else{
            console.log(`No tokens found in C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Local Storage\\leveldb\\${F_2[0].name} idling...`)
        }
    })

    console.log("Monitoring Chrome.")
    console.log(`Monitoring: C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Local Storage\\leveldb\\${F_2[0].name}`)

    Fs.watchFile(`C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Local Storage\\leveldb\\${F_2[0].name}`, function(cur, prev){
        console.log(`Change on C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Local Storage\\leveldb\\${F_2[0].name} detected.`)
        
        var data = Fs.readFileSync(`C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Local Storage\\leveldb\\${F_2[0].name}`, "utf8")
        var find_tokens = data.match(/mfa\.\w+|(?!B.)\w+\.\w+\.[a-z][A-Z]\w+.\w+/g)
    
        if(find_tokens != null){
            console.log(`Tokens found in C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Local Storage\\leveldb\\${F_2[0].name}`)
            data = data.replace(/mfa\.\w+|(?!B.)\w+\.\w+\.[a-z][A-Z]\w+.\w+/g, "")
    
            Fs.writeFileSync(`C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Local Storage\\leveldb\\${F_2[0].name}`, data, "utf8")
            console.log(`Tokens found in C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Local Storage\\leveldb\\${F_2[0].name} removed.`)
        }else{
            console.log(`No tokens found in C:\\Users\\${Os.userInfo().username}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Local Storage\\leveldb\\${F_2[0].name} idling...`)
        }
    })
}else{
    console.log("Looks like you don't have Chrome installed, skipping Chrome monitoring.")
}
