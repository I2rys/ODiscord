# ODiscord MalCBAAV
A way to make all of your malicious payload 100% undetectable.

## Installation
NPM Packages:

    npm i base-64 && npm i path

## Usage


    node chopchop.js <input(Your code encoded in base64)>

+ input - Your file that contains your code encoded in base64.
 
## Setup
1. Remove all the require stuff variable of your payload and place it to index.js.
2. Encode your payload using [Base64Encode](https://www.base64encode.org/) make a text file with any name and put the encoded payload there then use chopchop.js.
3. After you use chopchop.js, just convert it to exe file using [pkg](https://npmjs.com/package/pkg).
4. But before you convert it, test it first by running index.js If it works perfectly then convert it to exe file.

## Build
```
pkg .
```

## License
MIT © I2rys
