let fs=require("fs");
let path=require("path");
let EventEmmit=require("events");

class readable extends EventEmmit{
    constructor(p,option){
        super();
        this.p=p;
        this.flags=option.flags||"r";
        this.encoding=option.encoding||null;
        this.start=option.start||0;
        this.highWaterMark=option.highWaterMark||16*1024;
        //缓存的长度
        this.len=0;
        //存放缓存
        this.arr=[];
        //是否触发readable
        this.emitReadable=false;
        //
        this.pos=this.start;
        //是否在读
        this.reading=false;
        this.open();
        this.on("newListener",(type)=>{
           if(type=="readable"){
              this.read();
           }
        })
    }
    destroy(){
        if(typeof this.fd=="number"){
            this.close(this.fd,()=>{
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
                   return;
              }
              this.fd=fd;
              this.emit("open");
        })

    }
    read(n){
        let buffer;
        let current;
        if(n>0&&n<=this.len){
            buffer=Buffer.alloc(n);//读取几个就创建几个
            let index=0;
            let flag=true;
            //从缓存中拿出来
            while(flag && (current=this.arr.shift())){
                   for(var i=0;i<current.length;i++){
                       if(index>n){
                         flag=false;
                         let b=current.slice(i+1);
                         if(b.length>0){
                            this.arr.unshift(b);
                         }
                         this.len-=n;
                         break;
                       }
                       buffer[index++]=current[i];
                   }
            }


        }
        //只要缓存的长度是0，就会触发readable事件；
        if(this.len==0){
            this.emitReadable=true;
          // this.emit("readable")
        }
        //如果缓存区的长度《this.highWaterMark 就会触发真正的读
        if(this.len<this.highWaterMark){
            if(!this.reading){
                this.reading=true;
                this._read();//_read 是真正读取的方法
            }
            

        }
         if(buffer){
           buffer=this.encoding?buffer.toString(this.encoding):buffer;
         }
        return buffer;

       

    }
    _read(){
        if(typeof this.fd!="number"){
            this.once("open",()=>{
                this._read();
            })
            return;
        }
        let buffer=Buffer.alloc(this.highWaterMark);
        fs.read(this.fd,buffer,0,this.highWaterMark,this.pos,(err,bytesRead)=>{
          if(bytesRead>0){

            this.pos+= bytesRead;
            this.len+=bytesRead;
            this.arr.push(buffer);
            this.reading=false;
            if(this.emitReadable){
                this.emitReadable=false;
                this.emit("readable");
                
              }
 
          }else{
              this.emit("end")
          }
           
        })

    }
}

module.exports=readable;