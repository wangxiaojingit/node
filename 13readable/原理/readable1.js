let path=require("path");
let fs=require("fs");
let EventEmiter=require("events");
function computeNewHighWaterMark(n) {
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
    return n;
}
class readable extends EventEmiter{
    constructor(p,options){
        super();
       this.p=p;
       this.start=options.start||0;
       this.flags=options.flags||'r';
       this.encoding=options.encoding||null;
       this.highWaterMark=options.highWaterMark||16*1024;
       //判断是否正在读
       this.reading=false;
       //缓存
       this.arr=[];
       //缓存的长度
       this.len=0;
       //读取的偏移量
       this.pos=this.start;
       //默认不触发emitReadable 事件
       this.emitReadable=false;
       this.open();
       this.on("newListener",(type)=>{
          if(type=="readable"){
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
        fs.open(this.p,this.flags,(err,fd)=>{
              if(err){
                this.emit("error",err);
                this.destory();
                return
              }
              //正常的打开
              this.fd=fd;
              this.emit("open");
        })
    }
    read(n){
        if(n>this.len){
            // 如果想读的内容超标了 重新获取最新的水位线
            this.highWaterMark = computeNewHighWaterMark(n);
            this.reading = true;
            this._read();
        }
        //第一次缓存区肯定是空的,如果是空的话,我们就应该触发readable事件
        let buffer;
        let current;
       
        let index=0;
        
        //当读取的长度大于0,小于缓存长度的状态
        if(n>0&&n<=this.len){
            buffer=Buffer.alloc(n);
            let flag=true;
            while(flag&&(current=this.arr.shift())){
              for(var i=0;i<current.length;i++){
                 buffer[index++]=current[i];
                 if(index==n){
                    //获取够取得长度后,我们跳出去
                   
                    flag=false;
                    this.len-=n;
                    if(current.slice(index).length){
                        this.arr.unshift(current.slice(index)); 
                    }
                    break;
                 }
              }
            }
        }
        if(this.len==0){
          this.emitReadable=true;
        }else{
            this.emitReadable=false;
        }
        //当缓存去的长度小于水位线的时候,就会往缓存去存放highWater个
        if(this.len<this.highWaterMark){
           if(!this.reading){
            this.reading=true;   
            this._read()
           }
           
        }
        if(buffer){
            buffer=this.encoding?buffer.toString(this.encoding):buffer;
        }
        return buffer;
    }
    _read(){
        let buffer=Buffer.alloc(this.highWaterMark);
        if(typeof this.fd!="number"){
         return  this.once("open",()=>{
              this._read();
          })
          
        }
        fs.read(this.fd,buffer,0,this.highWaterMark,this.pos,(err,bytesRead)=>{
          if(bytesRead){
               
                this.len+=bytesRead;
                this.pos+=bytesRead;
                this.arr.push(buffer);
                this.reading=false;
                if(this.emitReadable){
                    
                    this.emit("readable");
                }
                
           }else{
              this.emit("end");
           }
           
      })
    }
}

module.exports=readable;