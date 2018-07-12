let path=require("path");
let fs=require("fs");
let EventEmitter=require("events");

class WriteStream extends EventEmitter{
    constructor(path,options){
       this.path=path;
       this.flags=options.flags||"w";
       this.mode=options.mode||0o666;
       this.autoClose=options.autoClose||true;
       this.encoding=options.encoding||"utf8";
       this.start=options.start||0;
       this.highWaterMark=options.highWaterMark;
       //值为false的时候,真正写入内存中,如果这个值是true的时候,就要写到缓存中
       this.writing=false;
       //存放到缓存中的数组;
       this.buffer=[];
       //存放缓存中的buffer的长度累积
       this.len=0;
       //存一个开始的位置
       this.pos=this.start;
       //false 的时候不触发抽干事件,true的时候才开始触发抽干事件.
       this.needDrain=false;
       this.open();
    }
     destory(){
       if(typeof this.fd=="number"){
          fs.close(this.fd,()=>{
              this.emit("close");
          });
          return;
       }
       this.emit("close");
     }
     open(){
         fs.open(this.path,this.flags,this.mode,(err,fd)=>{
             if(err){
                fs.emit("error");
                this.destory();//关掉文件
                return
             }
             this.fd=fd;
             fs.emit("open");//触发打开文件
         })
     }
}