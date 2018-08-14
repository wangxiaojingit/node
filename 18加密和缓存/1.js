let crypto=require("crypto")//常见的加密模块

/**
 * md5加密算法特点:
 *  1\ 算法不可逆
 *  2\ 不论内容有多少,长度都一样
 *  3\ 只要内容不同,加密出来的也不同,加密出来的不同,肯定内容不同
 * 
 * 
 */

//1------------------------
//console.log(crypto.getHashes());//获取所有的散列算法
let md5=crypto.createHash("md5") //创建hash对象
md5.update("123")//添加摘要的数据;摘要输出前可以多次update 数据
let result=md5.digest('hex')//输出摘要的内容,'hex'代表是16进制,输出之后,不能在update;
console.log(result);


//2---------------------
let crypto=require("crypto");
let fs=require("fs");
let path=require("path");
let md5=crypto.createHash("md5");
let str=fs.readFileSync(path.join(__dirname,'./1.html'))
md5.update(str);
let result=md5.digest('hex');
console.log(result);


//3----------

let fs=require("fs");
let crypto=require("crypto");
let path=require("path");
let p=path.join(__dirname,'./1.html');
let rx=fs.createReadStream(p,{
    highwaterMark:3
})

let md5=crypto.createHash("md5");
rx.on("data",(data)=>{
    md5.update(data);
})
rx.on("end",()=>{
  let result=  md5.digest("hex");
  console.log(result)
})




//4--------加盐算法HMAC

/**
 * 
 * 1\姜老师的openssl下载地址:http://dl.pconline.com.cn/download/355862-1.html,我用的这个.虽然写win32但是64也可以;
 * 2\下载完之后,双击运行....
 * 3\配置环境变量:找到控制面板----高级系统设置-----高级---环境变量
 * 4\ 例如:我把刚才的openssl 下载 到了c:\OpenSSL-Win32,我们要添加到全局环境变量,需要找到openssl.exe,我们在bin文件中找到,所以在系统变量中的path中,
 * 我们在后面C:\OpenSSL-Win32\bin;添加到path中
 * 5\打开cmd,输入openssl version -a 查看版本号
 * 
 * openssl genrsa -out rsa_private.key //生成私钥的命令
 * 
 * 
 * 
 * 
 */

 let crypto=require("crypto");
 let fs=require("fs");
 let path=require("path");
 
 let key=fs.readFileSync(path.join(__dirname,'./rsa_private.key'));
 let hmac=crypto.createHmac("sha1",key);
 hmac.update("zf");
 let result=hmac.digest("hex");
 console.log(result)



 //------


 let crypto=require("crypto");
 let fs=require("fs");
 let path=require("path");
 let key=fs.readFileSync(path.join(__dirname,'./rsa_private.key'));
 let hmac=crypto.createHmac("sha1",key);
 let rx=fs.createReadStream(path.join(__dirname,'./1.html'),{
     highWaterMark:3
 })
 rx.on("data",(data)=>{
    hmac.update(data)
 })
 rx.on("end",()=>{
    let result= hmac.digest("hex");
    console.log(result)
 })

//-------对称加密
let crypto=require("crypto");
let path=require("path");
let fs=require("fs");
let key=fs.readFileSync(path.join(__dirname,'./rsa_private.key'));
let cipher=crypto.createCipher('blowfish',key);
cipher.update("zf");
let result=cipher.final("hex");
//console.log(result);//41e3da66075766d3

//对上面的解密

let decipher=crypto.createDecipher('blowfish',key);
decipher.update(result,'hex');
let t=decipher.final("utf8");
console.log(t);

//----------------非对称加密算法

/***
 * 
 * 非对称加密算法需要两个密钥：公开密钥(publickey)和私有密钥(privatekey)
   公钥与私钥是一对，如果用公钥对数据进行加密，只有用对应的私钥才能解密,如果私钥加密，只能公钥解密
   因为加密和解密使用的是两个不同的密钥，所以这种算法叫作非对称加密算法
 * 
 * 
 */

 //1\  生成私钥和公钥的命令  openssl rsa -in rsa_private.key -pubout -out rsa_public.key //前提先生成私钥,之后再执行这个命令

let crypto=require("crypto");
let fs=require("fs");
let path=require("path");
let privatekey=fs.readFileSync(path.join(__dirname,"./rsa_private.key"),'utf-8');
let rsa_public=fs.readFileSync(path.join(__dirname,"./rsa_public.key"),'utf-8');

let result=crypto.publicEncrypt(rsa_public,Buffer.from('hello'));//用公钥对数据进行加密,需要用私钥去解
console.log(result);
let r=crypto.privateDecrypt(privatekey,result);
console.log(r.toString())








 

