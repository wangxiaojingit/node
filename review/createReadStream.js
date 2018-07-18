let fs=require("fs");
let path=require("path");
let Emmiter=require("events");
class CreateReadStream extends Emmiter {
     constructor(p,options){
         super();
         this.path=p;
         this.flag=options.flag||'r';
         this.autoClose=options.autoClose||true;
         this.start=options.start||0;
         this.end=options.end||null;
         this.highWaterMark=options.highWaterMark||16*1024;
         this.pos=this.start;
         this.buffer=Buffer.alloc(this.highWaterMark);
         this.flowing=null;
         this.open();
         this.on("newListener",function(type){
               if(type=="data"){
                this.flowing=true;
                 this.read();
               }
         })
     }
     destory(){
         if(typeof this.fd=="number"){
            fs.close(this.fd);
            this.emit("close");
            return
         }
     }
     open(){
       fs.open(this.path,this.flags,function(err,fd){
             if(err){
               this.emit("error",err);
               this.destory();
             }
             this.fd=fd;
             this.emit("open");
       })
     }
     read(){
        
         if(typeof this.fd!="number"){
           //如果没有的话,需要再去绑定一次
           this.on("open",()=>{
               this.read();
           })  

         }else{
          //如果有fd,就正常去读
          fs.read(this.fd,this.buffer,0,howlength,this.pos)
         }
     }
     
}