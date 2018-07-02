//解决buffer乱码的问题
let {StringDecoder}=require('string_decoder');

let buffer=Buffer.from("我最棒！");
let buffer1=buffer.slice(0,4);
let buffer2=buffer.slice(4);
//console.log(buffer1.toString());//我�

//console.log(buffer2.toString());//�棒！
//为了解决上面的buffer 乱码，我们用string_decoder
let str=new StringDecoder();
console.log(str.write(buffer1).toString());
console.log(str.write(buffer2).toString());