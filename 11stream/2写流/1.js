let fs=require("fs");
let path=require("path");

let ws=fs.createWriteStream(path.join(__dirname,"./write6.txt"),{
    flags:'w',
    encoding:'utf8',
    autoClose:true,
    start:0,
    highWaterMark:3
    
})
//ws.write()方法,第一次是真实的写入到文件中,后面的每次执行都会先写到缓存中
let flag=ws.write("1");
console.log(flag);
flag=ws.write("1");
console.log(flag);
flag=ws.write("1");
console.log(flag);
/**
 * highWaterMark,标识位,加入一个文件1g,每次写入6k,把每次写入的累积,如果超过了或者等于highWaterMark,
 * write方法的返回值会是false,<=highWaterMark 的时候,返回值会是true
 * 
 */

 ws.on("drain",function(){
     console.log("抽干")
 })
 //ws.on("drain") 抽干这个方法,是必须写的内容大于highWaterMark的时候,才会执行.

 ws.end("死了") //会清空文件的缓存,并关掉文件
 //ws.write("2") //当文件用了end之后,就不能再用ws.write()方法了,报错: write after end


 /**
  *let ws= fs.createWriteStream()
  * 
   ws.write("1") //写

   ws.on("drain") //抽干
   ws.end(); //清缓存,关闭文件

  *注意一下highWaterMark 和flag
  * 




  */
