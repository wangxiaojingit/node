
let buf1=Buffer.from("珠峰**课堂**学习")
Buffer.prototype.split=function(sep){
   sep=Buffer.from(sep);
   let sepLen=sep.length;
   let index=0;
   let ary=[];
   let pos=0;
   while( (pos=this.indexOf(sep,index))>-1){
       let item= this.slice(index,pos);
       ary.push(item);
       index=pos+sepLen;
   }
   ary.push(this.slice(index))
   return ary;
}


console.log(buf1.split("**"))


