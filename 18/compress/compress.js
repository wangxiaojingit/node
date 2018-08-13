/**
 * zlib压缩文件模块,把读到的文件压缩之后,再把压缩的写出来
 * 
 */
let zlib=require("zlib");
let fs=require("fs");
let http=require("http");

let  path=require("path");

function zlibFn(source){
    let createGzip=zlib.createGzip();//转化流
    let p=path.join(__dirname,source);
    fs.createReadStream(p).pipe(createGzip).pipe(fs.createWriteStream(path.join(__dirname,'1.txt.gz')))
}
zlibFn("./1.txt");


//有压缩还有解压
let zlib=require("zlib");
let fs=require("fs");
let http=require("http");

let  path=require("path");
function unzlibFn(source){
    let createGunzip=zlib.createGunzip();//转化为解压的流
    let p=path.basename(source,'.gz');
    fs.createReadStream(path.join(__dirname,source)).pipe(createGunzip).pipe(fs.createWriteStream(path.join(__dirname,p)));
}

unzlibFn('1.txt.gz')


