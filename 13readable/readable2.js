let fs=require("fs");
let path=require("path");
let EventEmmiter=require("events");

class lineReader extends EventEmmiter{
      constructor(p){
          super();
         this.p=p;//把路径存到实例上
         this._readStream=fs.createReadStream(this.p);
         this.arr=[];//存放行数据
         let Enter = 13;//windows 怎么表示是新的一行 就用\r
         let LINE = 10;  //\n 10  mac  没有\r 只有\n
         this.on("newListener",(type)=>{
           if(type=="lineReader"){
               //如果监听了行处理事件
               this._readStream.on("readable",()=>{
                   let r;
                   while(r=this._readStream.read(1)){
                       
                       switch(r[0]){
                          case Enter:
                          //在window环境中,如果是回车,说明就是换行
                          let result=Buffer.concat(this.arr);
                          this.emit("lineReader",result);
                          this.arr=[];
                          //在window 中也有换行,如果下一个是换行,我们就不存放,
                          let next = this._readStream.read(1);
                                if (next[0] !== LINE) {
                                    this.arr.push(current);
                                }
                          break;
                          case LINE:
                           //在mac 中换行就是一行
                          let result1=Buffer.concat(this.arr);
                          this.emit("lineReader",result1);
                          this.arr=[];
                          break;
                          default:
                          
                          this.arr.push(r)
                          break; 
                       }
                   }

               })
           }
         })
         this._readStream.on("end",()=>{
            
             //如果读完了
             if(this.arr.length){
                 let result=Buffer.concat(this.arr);
                this.emit("lineReader",result);
                this.arr=[];
             }
         })

      }
      
}


let line=new lineReader(path.join(__dirname,"./1.txt"));
line.on("lineReader",(data)=>{
    console.log(data.toString()+"--------");
})