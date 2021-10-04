//Dependencies
const Puppeteer = require("puppeteer")

//Variables
const Email = "" || process.env.email
const Password = "" || process.env.password

//Functions
async function Main(){
    const browser = await Puppeteer.launch({ headless: false, args: ["--no-sandbox", "--disable-setuid-sandbox"] })
    const page = await browser.newPage()

    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36")
    await page.goto("https://discord.com/login", { waitUntil: "networkidle0" })
    await page.type("div.inputWrapper-31_8H8.inputWrapper-3aw2Sf > input", Email)
    await page.type("div.block-egJnc0.marginTop20-3TxNs6 > div:nth-of-type(2) > div > input", Password)
    await Promise.all([
        await page.click("div.block-egJnc0.marginTop20-3TxNs6 > button.marginBottom8-AtZOdT.button-3k0cO7.button-38aScr.lookFilled-1Gx00P.colorBrand-3pXr91.sizeLarge-1vSeWK.fullWidth-1orjjo.grow-q77ONN"),
        await page.waitForNavigation({ waitUntil: "networkidle0" })
    ])
    
    const page_content = await page.content()

    console.log("Checking for any new login detected(1).")
    if(page_content.indexOf("New login location detected,") != -1){
        console.log("New location login detected. Please check your email and verify the location then rerun the program.")
        process.exit()
    }

    console.log("Checking for any captchas.")
    if(page_content.indexOf("https://discord.com/assets/0f4d1ff76624bb45a3fee4189279ee92.svg") != -1){
        console.log("Captcha detected, please solve it and don't exit the program.")
    }

    console.log("Checking for any new login detected(2).")
    if(page_content.indexOf("New login location detected,") != -1){
        console.log("New location login detected. Please check your email and verify the location then rerun the program.")
        process.exit()
    }

    await page.waitForSelector("div.tabBar-ZmDY9v.topPill-30KHOu > div:nth-of-type(5) > span", { timeout: 0 })
    console.log("Logined successfully!")
    console.log("If the hoster is running 24/7 then just leave it and your account will be online 24/7.")
}

//Main
Main()
