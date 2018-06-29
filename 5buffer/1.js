//console.log(Buffer)
/**
 * Buffer 是global上的属性,Buffer可以申请内存,存放图片,文本等.
 */

 //1------申请buffer内存的三种方式: 通过申请buffer长度:buffer.alloc/buffer.allocUnsafe 


//申请内存,这种方式申请的内存是很干净的,<Buffer 00 00 00 00 00 00>,进行过手动清理,不过速度会慢一点
let buffer=Buffer.alloc(6) ;
//这种方式申请的速度相对快,但是内容不干净,有可能留有原来的东西,还没清理
let buffer2=Buffer.allocUnsafe(6) //<Buffer 90 d4 31 00 00 00> 随机
//buffer.fill(value,start,end),填充buffer的内容
buffer.fill(1,0,3) //<Buffer 01 01 01 00 00 00>
console.log(buffer);

//2---------通过字符串
let buffer3=Buffer.from("王小金");//node 不支持gbk,只支持utf-8
console.log(buffer3)

//3----通过数组构建

let buffer4=Buffer.from([1,2,3]) ;
console.log(buffer4);


//把buffer 和字符串进行转换,例如:"珠峰培训"转换为buffer;
//方法一:
let buffer5=Buffer.from("珠峰培训");
console.log(buffer5) // <Buffer e7 8f a0 e5 b3 b0 e5 9f b9 e8 ae ad>
//方法二:
let buffer6=Buffer.alloc(12) //一个汉字是3位,四个汉字,就是12位
let buffer_1="珠";
let buffer_2="峰培训"
buffer6.write(buffer_1,0,3,"utf8");
buffer6.write(buffer_2,3,9,"utf8");
console.log(buffer6.toString());


/**
 * 小结:Buffer
 * Buffer.alloc(num)/Buffer.allocUnsafe(num) //申请内存长度
 * Buffer.from(string)
 * Buffer.from([])
 * 
 * Buffer.write(string,start,length,"encoding")
 * 
 * 
 */