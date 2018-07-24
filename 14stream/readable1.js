//tcp 实现可读流

let {Readable}=require("stream");

//Readable 可读流的基类

class MyRead extends Readable{
    constructor(){
        super();
        this.index=0;
        
    }
    _read(){
        this.index++;
        this.push(this.index+"");
        if(this.index==5){
          this.push(null); //当写上this.push(null)的时候会触发下面的on("end")事件
        }
    }
   
}

let myread=new MyRead();
//this.push(null); //代表终止,如果不加这个,就会不停去调取_read();
myread.on("data",function(data){
    console.log(data);
})

myread.on("end",function(data){
   console.log("end")
})