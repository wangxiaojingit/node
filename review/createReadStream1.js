let fs=require("fs");
let path=require("path");
let Emitter=require("events");
class createRead extends Emitter{
    constructor(p,option){
        this.p=p;
        this.flags=options.flags;
        this.encoding=options.encoding||null;
        this.autoClose=options.autoClose;
        this.highWaterMark=options.highWaterMark;
        this.start=options.start||0;
        this.pos=this.start;
        this.flowing=false;
        this.buffer=Buffer.alloc(this.highWaterMark);
        this.open();
        this.on("newListener",(type)=>{
            if(type=="data"){
               this.flowing=true;
               this.read()
            }
        })
    }
    destory(){
        if(typeof this.fd=="number"){
            fs.close(this.fd,()=>{
                this.emit("close");
            })

            return
        }
        this.emit("close");
    }
    open(){
       fs.open(this.p,this.flags,(err,fd)=>{
           if(err){
              this.emit("error");
              this.destory()
              return;
           }
           this.fd=fd;
           this.emit("open");
       })
       
    }
    read(){
        if(typeof this.fd!="number"){
           this.on("open",()=>{
               this.read()
           })
           return;
        }
        let howLength;
        if(this.end){
            if(this.pos+this.highWaterMark-1<this.end){
               howLength=this.highWaterMark;
            }else{
                howLength=this.highWaterMark-(this.pos+this.highWaterMark-1-end);
            }
        }else{
            howLength=this.highWaterMark;
        }
        fs.read(this.fd,this.buffer,0,howLength,this.pos,(err,bytesRead)=>{
                if(bytesRead){
                    this.pos+=this.bytesRead;
                   let r=this.buffer.slice(0,bytesRead);
                   r=this.encoding?r.toString(this.encoding):r;
                   this.emit("data",r);
                   if(this.flowing){
                      this.read();
                   }
                }else{
                    //读不到了,
                    this.emit("end");
                    this.destory();
                }
        })
    }
    pause(){
        this.flowing=false;
    }
    resume(){
        this.flowing=true;
        this.read();
    }
}