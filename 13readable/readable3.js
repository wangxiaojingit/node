let path=require("path");
let fs=require("fs");
let EventEmmit=require("events");

class lineRead extends EventEmmit{
    constructor(p){
        super();
        this.p=p;
        this._r=fs.createReadStream(p);
        let r ;
        let ENTER=13;
        let LINE=10;
        this.arr=[];
        this.on("newListener",(type)=>{
            if(type=="lineread"){
                this._r.on("readable",()=>{
                    while(r=this._r.read(1)){
                       switch(r[0]){
                          case ENTER:
                          let result=Buffer.concat(this.arr);
                          this.emit("lineread",result);
                          this.arr=[];
                          let next=this._r.read(1);
                          if(next[0]!=LINE){
                            this.arr.push(next);
                          }
                          break;
                          default:
                           this.arr.push(r);
                          break
                       }
                    }
                })
            }
        })
    }
}

let f=new lineRead(path.join(__dirname,"./1.txt"));
f.on("lineread",(data)=>{
    console.log(data.toString())
})