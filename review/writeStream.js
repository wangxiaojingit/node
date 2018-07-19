let path=require("path");
let fs=require("fs");
let Emmiter=require("events");
class WriteStream extends Emmiter{
    constructor(p,options){
        super();
        this.p=p;
        this.flags=options.flags||'w';
        this.encoding=options.encoding||'utf8';
        this.start=options.start||0;
        this.autoClose=options.autoClose||true;
        this.highWaterMark=options.highWaterMark||16*1024;
        this.pos=this.start;
        //是否触发drain 事件;
        this.needDrain=false;
        //是否正在写入
        this.writing=false;
        //存放缓存的数据;
        this.cache=[];
        //计算buffer的长度
        this.len=0;
        this.open();
    }
    destory(){
        if(typeof this.fd=="number"){
           fs.close(this.p,()=>{
               this.emit("close");

           })
           return;
        }
        this.emit("close");
    }
    open(){
        fs.open(this.p,this.flags,(err,fd)=>{
              if(err){
                this.emit("error");
                this.destory();
                return
              }
              this.fd=fd;
              this.emit("open");
        })
    }
    clearBuffer(callabck){
        let buf=this.cache.shift();
        if(buf){
           this._write(buf.trunk,buf.encoding,()=>{this.clearBuffer(buf.callback)});
        }else{
            //说明已经写完了
            this.writing=false;
            this.needDrain=false;
            this.emit('drain');
        }
    }
    _write(trunk,encoding,callback){
         if(typeof this.fd !="number"){
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
           //如果正在写入,我们就要存放到缓存区
           this.cache.push({trunk,encoding,callback})
        }else{
            this.writing=true;
            this._write(trunk,encoding,()=>{this.clearBuffer(callback)})
        }
       
        

       return !this.needDrain
    }
}

module.exports=WriteStream;
