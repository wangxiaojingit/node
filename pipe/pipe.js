let fs=require("fs");
let path=require("path");
let readStream=require(path.join(__dirname,"./readStream.js"));
let writeStream=require(path.join(__dirname,"./writeStream.js"));

let readFile=path.join(__dirname,"./1.txt");
let writeFile=path.join(__dirname,"./2.txt");
console.log(readFile);
console.log(writeFile);
let rx=new readStream(readFile);

let wx=new writeStream(writeFile);

rx.pipe(wx);