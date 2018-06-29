Buffer.prototype.mysplit=function(str){
    let strLeng=Buffer.from(str).length;
    let pos=0;
    let ary=[];
    var index=0;
    while(-1!=(index=this.indexOf(str,pos))){
        let cur=this.slice(pos,index);
        ary.push(cur);
        pos=strLeng+index;
    }
    ary.push(this.slice(pos));
   
    return ary; 
}
let buffer=Buffer.from("朱_和_人");
let newbuffer=buffer.mysplit("_");

newbuffer.forEach(element => {
   console.log(element.toString()) 
});