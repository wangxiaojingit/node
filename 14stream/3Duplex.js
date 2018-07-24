let {Duplex}=require("stream");
//Duplex 是双攻流 即可以读又可以写
class MyDuplex extends Duplex{
    constructor(){
        super();

    }
    _read(){
        this.push("1");
        this.push(null);
    }
    _write(buffer,enconding,callback){
          console.log(buffer.toString());
          callback();
    }
}

let myDuplex=new MyDuplex();
myDuplex.on("data",function(data){
    console.log(data)
})
myDuplex.on("end",function(){
    console.log("end")
})
myDuplex.write("3------");
myDuplex.write("5-------");

//但是如果myDuplex.on("data")的时候 就不要再on("readable")
setTimeout(()=>{
    myDuplex.on('readable',function(data){
        console.log(data,'xxxx');
    });
},3000);