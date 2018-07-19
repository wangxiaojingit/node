let fs=require("fs");
let path=require("path");
let rx=fs.createReadStream(path.join(__dirname,'./1.txt'));
let wx=fs.createWriteStream(path.join(__dirname,'./2.txt'));
rx.pipe(wx);