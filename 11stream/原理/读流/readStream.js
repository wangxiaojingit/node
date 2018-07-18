let EventEmitter=require("events");
let fs=require("fs");
class readStream extends EventEmitter {
      constructor(path,options){
         super();
         //把传过来的配置项放到实例上,方便在实例调取别的方法的时候用
         this.path=path;
         this.flags=options.flags||'r',
         this.start=options.start||0,
         this.end=options.end||null,
         this.highWaterMark=options.highWaterMark||64*1024,
         this.encoding=options.encoding||null,
         this.autoClose=options.autoClose||true,
         //流的模式
         this.flowing=null,
         //读文件的时候,需要创建一个buffer
         this.buffer=Buffer.alloc(this.highWaterMark);
         //
         this.position=this.start;
         //只要new 了readStram()这个类,我们就应该先打开文件再执行其它操作
         this.open(); //异步
         //什么时候开始读文件?当用户触发on("data")
         this.on("newListener",(type)=>{ //同步
                if(type=="data"){
                   this.flowing=true;   
                   this.read() 
                }
         })
      }
      destory(){
            if(typeof this.fd =="Number"){
               //说明打开之后出错,我们需要关掉这个文件
               fs.close(this.fd,function(err){
                  this.emit("close")
               });
               return;
               
            }
            //
            this.emit("close")
      }
      //打开文件
      open(){
         fs.open(this.path,this.flags,(err,fd)=>{
             if(err){
                //打开文件的时候,如果出错,
                this.emit("error",err);
                if(this.autoClose){
                   this.destory() //关掉这个文件
                }
             }
             this.fd=fd;//把这个fd存放起来,等读文件的时候用
             this.emit("open");            
         })
      }
      //读文件
      read(){
            //因为this.open() 是异步,read()是同步,此时先执行的是read(),此时还没有fd,
            //我们需要打开之后再触发这个方法
         //console.log("fd:"+this.fd)//undefined
         //等待着文件被打开,打开之后,我们在执行read
         if(typeof this.fd!=="number"){
          return  this.once("open",(err)=>{this.read()})
         }

         let howLength;
         if(this.end){
            if(this.position+this.highWaterMark-1<this.end){
                  howLength=this.highWaterMark;
               }else{
                  howLength= this.highWaterMark-((this.position+this.highWaterMark-1)-this.end);
            }
      
         }
         //开始写读的逻辑
         fs.read(this.fd,this.buffer,0,howLength,this.position,(err,bytesRead)=>{
              if(bytesRead>0){
                  //如果读到内容了
                 this.position=this.position+bytesRead;
                 //每次读到内容的时候需要把这个内容发出去,保留有用的
                 let r=this.buffer.slice(0,bytesRead);
                 r=this.encoding?r.toString(this.encoding):r;
                 this.emit("data",r);
                 if(this.flowing){
                    this.read();
                 }
                 //this.read();
              }else{
                    //如果没内容
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

module.exports=readStream;