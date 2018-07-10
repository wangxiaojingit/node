//Buffer 的几种方法

//1--------Buffer.slice
let ary=[1,[1],3];
let newAry=ary.slice(1,2);
newAry[0][0]=2;
//console.log(ary) //[ 1, [ 2 ], 3 ] 已经改变了原来数组,是浅拷贝,拷贝的是内存地址.
//Buffer.slice() 和数组的slice方法一样,拷贝的都是内存地址,都是浅拷贝

let buffer=Buffer.alloc(6);
let newBuffer=buffer.slice(0,3);
newBuffer[0]=100;
console.log(buffer)
//2--------Buffer.copy  
//Buffer.copy() 主要是针对buffer流,而Buffer.write()写入的是string.
let buffer1=Buffer.alloc(6);
let buffer_1=Buffer.from("加");
let buffer_2=Buffer.from("油");
buffer_1.copy(buffer1,0,0,3);
//buffer_2.copy(buffer1,3,0,3);
Buffer.prototype.myCopy=function(tartget,offset,sourceStart,sourceEnd){

}
//3----Buffer.concat(); 把buffer流拼接成新的数组

let buffer1=Buffer.from("树");
let buffer2=Buffer.from("林");
let buffer3=Buffer.concat([buffer1,buffer2],100)
console.log(buffer3.toString())
//----Buffer.indexOf(str),找出str在buffer中的开始位置,如果没有,就返回-1
let buffer=Buffer.from("小_树林");
console.log(buffer.indexOf("_"));//3
console.log(buffer.indexOf("木"));//-1

//---Buffer.split(str) //需要自己封装
let buffer=Buffer.from("小_树_林");
let bufferList=buffer.split("_");
console.log(bufferList)


/**
 * 小结:
 * Buffer.slice(start,end) //浅拷贝,拷贝的是内存地址
 * buffer1.copy(newbuffer(bufferSource),pos(newBuffer的哪个位置开始),buffer1Start(buffer1的哪个起始位置),buffer1End)
 * buffer.indexOf(str),看一个字符串在buffer中的哪个索引位置,如果没有就是-1
 * buffer.concat(list,totalNum) 把buffer 数组流进行拼接,形成一个新数组,totalNum是县数组的总共长度
 * buffer.split(str) 把buffer流以一个字符串进行分割,形成新数组,这个方法需要自己来实现.
 */