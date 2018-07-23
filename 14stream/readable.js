//tcp 实现可读流

let {Readable}=require("stream");

//Readable 可读流的基类

class MyRead extends Readable{
    constructor(){
        super();
        
    }
    _read(){
        //console.log("1");
        for(var i=0;i<3;i++){
           this.push(i+"");
        }
        this.push(null); //代表终止,如果不加这个会
    };
}

let myread=new MyRead();
//this.push(null); //代表终止,如果不加这个,就会不停去调取_read();
myread.on("data",function(data){
    console.log(data);
})

myread.on("end",function(data){
   console.log("end")
})