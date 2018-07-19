let fs=require("fs");
let path=require("path");
let Emmiter=require("events");
class CreateReadStream extends Emmiter {
    constructor(p,options){
         super();
         this.path=p;
         this.flags=options.flags||'r';
         this.autoClose=options.autoClose||true;
         this.start=options.start||0;
         this.encoding=options.encoding||null;
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
             fs.close(this.fd,(err)=>{
                this.emit("close");
             })
            
            
            return
         }
     }
     open(){
       fs.open(this.path,this.flags,(err,fd)=>{
             if(err){
               this.emit("error",err);
               if(this.autoClose){
                this.destory();
               }
               return;
             }
             this.fd=fd;
             this.emit("open");
       })
     }
     read(){
         if(typeof this.fd!="number"){
           //如果没有的话,需要再去绑定一次
           this.once("open",()=>{
               this.read();
           })  

         }else{
          //如果有fd,就正常去读
          let howlength;
          if(this.end){
           if (this.pos+this.highWaterMark-1<=this.end){
            howlength=this.highWaterMark
           }else{
            howlength=this.highWaterMark-(this.pos+this.highWaterMark-1-this.end);
           }
            
          }else{
            howlength=this.highWaterMark
          }
          
          fs.read(this.fd,this.buffer,0,howlength,this.pos,(error,bytesRead)=>{
              if(bytesRead){
                  this.pos=this.pos+bytesRead;
                  let r=this.buffer.slice(0,bytesRead);
                  r=this.encoding?r.toString(this.encoding):r;
                  
                  this.emit("data",r);
                  if(this.flowing){
                      this.read()
                  }
              }else{
                  //读不到了,说明完了
                  this.emit("end");
                  this.destory(); 
                  
              }
          })
         }
     }
     pause(){
         this.flowing=false;
     }
     resume(){
         this.flowing=true;
         this.read();
     }
     
}
module.exports=CreateReadStream;