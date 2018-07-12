
let fs=require("fs");
let path=require("path");
let EventEmmter=require("events");
class CreateReadStream extends EventEmmter{
      constructor(path,options){
          super();
          this.path=path;
          this.flags=options.flags||'r';
          this.encoding=options.encoding||null,
          this.autoClose=options.autoClose;
          this.start=options.start;
          this.end=options.end;
          this.highWaterMark=options.highWaterMark;
          //标志流的模式
          this.flowing=false;
          //读文件的时候存放的buffer
          this.buffer=Buffer.alloc(this.highWaterMark);
          //记录读取的位置
          this.pos=this.start;
          //当new这个实例的时候,就要先打开文件夹,一遍后续的操作
          this.open();
          //什么时候开始读呢?this.on("data") 的时候,我们就应该去读
          this.on("newListener",(type)=>{
             if(type=="data"){
                this.flowing=true; 
                this.read();

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
          fs.open(this.path,this.flags,(err,fd)=>{
               if(err){
                 //如果打开过程出错
                 this.emit("error");
                 if(this.autoClose){
                    this.destory();//关掉文件夹
                 }
                 
                 return;
               }
               this.fd=fd;
               this.emit("open")
          })
      }

      read(){
          //读的时候,如果还没打开
          if(typeof this.fd !="number"){
             //说明还没打开文件,我们需要等待打开文件
             this.once("open",()=>{
                  this.read();
             })
             return;
          }
          let howLength;
          if(this.end){
             if(this.pos+this.highWaterMark-1<this.end){
                howLength=this.highWaterMark;
             }else{
               howLength= this.highWaterMark-  (this.pos+this.highWaterMark-1-this.end);
             }
          }else{
              howLength=this.highWaterMark;
          }
          //开始读的逻辑
          fs.read(this.fd,this.buffer,0,howLength,this.pos,(err,bytesRead)=>{
               if(bytesRead>0){
                  //如果读取到了内容,
                  this.pos=this.pos+bytesRead;
                  let data= this.buffer.slice(0,bytesRead);
                  data=this.encoding?data.toString(this.encoding):data;
                  this.emit("data",data);
                  if(this.flowing){
                     this.read()
                  }
               }else{
                   //如果读不到内容
                   this.emit("end");
                   this.flowing=false;
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

module.exports=CreateReadStream