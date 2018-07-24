let {Writable}=require("stream");
class MyWritable extends Writable {
    constructor(){
        super();
    }
    _write(buffer,encoding,callback){
       console.log("buffer:"+buffer);
       console.log("encoding:"+encoding);
       callback();//不调用callback 就不会继续将缓存的内容写入
    }
}

let myWritable =new MyWritable();

myWritable.write("1","utf8",()=>{
    console.log("----")
})

myWritable.write("2","utf8",()=>{
    console.log("----")
})