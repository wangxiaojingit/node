// 流的两种模式,一、流动模式，rs.on("data")二、暂停模式 rs.on("readable")

/**
 * 流动模式:先把水杯给倒满,喝多少取决于你自己.
 * 
 * 1、只要水杯是空的,就会触发on(readable),如果水壶的水也不够highWater 个了,就会先
 * 返回一个null,然后把水壶剩下的所有都倒给水杯.
 * 
 * 2、只要水杯的水低于highWaterMark 个,就会自动续杯highWaterMark个
 * 
 */

let fs=require("fs");
let path=require("path");
let rs=fs.createReadStream(path.join(__dirname,"./1.txt"),{
    highWaterMark:3,
    encoding:'utf8'
});
/* 1---------------------
rs.on("readable",()=>{
    //只要水杯是空的,就会去触发这个事件,第一次触发
    console.log("ok")
})
*/
//2-----------------------------------
/*rs.on("readable",()=>{
    let r=rs.read(3); //喝了3个,highWaterMark:3 杯子空了就会触发
    console.log(r);

    
})*/
/**
 *  123 ----杯子空了就又触发,
    456 ----杯子空了就又触发,
    789 ----杯子空了就又触发,
    null --杯子空了,又触发,但是茶壶的水不够highWaterMark 所以给了null
    0    --看下茶壶还有一个0,就把这个剩下的0都倒给了杯子
 * 
 * 
 */

 //3--------只要水杯的水低于highWaterMark 个就会自动续杯

 rs.on("readable",()=>{
     let r=rs.read(1);
     console.log(rs._readableState.length);
     setTimeout(function(){
        console.log(rs._readableState.length);
     },1000)
 })

 /**
  * 2
    5
  * 
  */
 
