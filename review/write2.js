let fs=require("fs");
let path=require("path");
let Emmiter=require("events");

class Wr extends Emmiter{
    constructor(p,options){
        super();
        this.p=p;
        this.flags=options.flags||'w';
        this.encoding=options.encoding||"utf8";
        this.mode=options.mode||0o666;
        this.autoClose=options.autoClose;
        this.start=options.start||0;
        this.highWaterMark=options.highWaterMark||16*1024;
        this.len=0;
        this.pos=this.start;
        this.writing=false;//默认没有在写
        this.needDrain=false;//默认不触发drain事件
        this.cache=[];//存放缓存的数据
        this.open()
    }
    destory(){
        if(typeof this.fd=="number"){
           this.fs("close",()=>{
               this.emit("close")
           })
           return;
        }
        this.emit("close");
    }
    open(){
        fs.open(this.p,this.flags,(err,fd)=>{
               if(err){
                 this.emit("error",err);
                 this.destory();
                 return;
               }
               this.fd=fd;
        })
    }
    clearBuffer(callback){
        let buf=this.cache.shift();
       if(buf){
         this._write(buf.trunk,buf.encoding,()=>{this.clearBuffer(buf.callback)})
       }else{
           this.writing=false;
           this.needDrain=false;
           this.emit("drain");
       }
    }
    _write(trunk,encoding,callback){
       if(typeof this.fd!="number"){
          this.once("open",()=>{
              this._write(trunk,encoding,callback);
          })
          return;
       }
       fs.write(this.fd,trunk,0,trunk.length,this.pos,(err,writeBytes)=>{
            if(writeBytes){
                 this.len-=writeBytes;
                 this.pos+=writeBytes;
                 callback();
            }
       })
    }
    write(trunk,encoding=this.encoding,callback){
           trunk=Buffer.isBuffer(trunk)?trunk:Buffer.from(trunk);
           this.len+=trunk.length;
           this.needDrain=this.len<this.highWaterMark?false:true;
           if(this.writing){
              //如果正在写入走缓存
              this.cache.push({trunk,encoding,callback})
           }else{
               this.writing=true;
               this._write(trunk,encoding,()=>{this.clearBuffer(callback)})
           }
           return !this.needDrain;
    }
}

module.exports=Wr;