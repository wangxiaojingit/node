let path=require("path");
let fs=require("fs");

let rs=fs.createReadStream(path.join(__dirname,'./text.js'),{
    flags:'r',
    encoding:null,
    autoClose:true,
    start:0,
    end:6,
    highWaterMark:2
    
})

/**
 * 
 * 一般不用这个字符串拼接
 * 
 */
    // let str="";
    // rs.on("data",function(data){
    //     str+=data;
    // })
    // rs.on("end",function(){
    //     console.log(str)
    // })

/**
 * 
 * 一般用这个方法
 * 
 */
 let ary=[];
 rs.on("data",function(data){
     console.log("1:"+data);
     rs.pause(); //关掉流
    ary.push(data);
    setTimeout(function(){
        rs.resume() //开启流
    },1000)
 })

 rs.on("end",function(data){
     let dat=Buffer.concat(ary)
     console.log(dat.toString())
 })

 rs.on("error",function(err){
    console.log(err)
 })

 /**
  * 读流
     let rs=fs.createReadStream();
     rs.on("data") //监听数据流
     rs.on("end")  //流完
     rs.on("error") //出错
     rs.pause();   //暂停
     rs.resume()   //开启

  * 


  */