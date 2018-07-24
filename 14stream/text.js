let {Readable}=require("stream");

class MyReadable extends Readable {
    constructor(){
        super();
        this.index=0;
    }
    _read(){
        this.index++;
        this.push(this.index+"");
        if(this.index==5){
          this.push(null);
        }
    }
}

let myReadable=new MyReadable();
//打印出来的是this.push()里面的数据
myReadable.on("data",function(data){
    console.log(data)
})
//_read 方法里面,如果有this.push(null)的时候就会触发on("end")
myReadable.on("end",function(){
      console.log("end")
})
