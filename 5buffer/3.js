import { BADFAMILY } from "dns";

 //Buffer 几个常用方法的实现

 /**
  * 1.Buffer.copy()
  */
  Buffer.prototype.mycopy=function(source,sorceOffset,start,end){
    for(var i=start;i<end;i++){
        source[sorceOffset++]=this[i];
    }
  }
   let buffer1=Buffer.from("树");
   let buffer2=Buffer.from("林");
   let newBuffer=Buffer.alloc(6);
   buffer1.mycopy(newBuffer,0,0,3);
   buffer2.mycopy(newBuffer,3,0,3);
   console.log(newBuffer.toString())
   
   
   
  

/**
 *
 * Buffer.concat(list,totalLength);
 * 
 */

 Buffer.myconcat=function(list,totalLength){
     if(typeof totalLength=="undefined"){
        //如果没有传totalLength,就获取list里面的总长度
        totalLength=  list.reduce(function(pre,next,index){
           return pre+next.length;
        },0);
      }
      
      
     if(totalLength==1)return list[0];
     let newBuffer=Buffer.alloc(totalLength); //先去申请一个内存空间
     let pos=0;//记录一个位置
     list.forEach((element,index )=> {
         //element:[00 00 00];
         for(var i=0;i<element.length;i++){
            newBuffer[pos++]=element[i];
         }
         
     });
     newBuffer.fill(0,pos); //当规定的totalLength大于list总共的长度的时候,我们把剩下的都补成0
     return newBuffer;
 }
let buffer1=Buffer.from("小");
let buffer2=Buffer.from("树");
let newBuffer= Buffer.concat([buffer1,buffer2]);


console.log(Buffer.myconcat([buffer1,buffer2]).toString()) ;

/**
 * Buffer.split
 * [12 44 88]
 * str="1_2_3";
 * [1,2,3]
 */

 Buffer.prototype.mysplit=function(str){
     let strLeng=Buffer.from(str).length;
     let pos=0;
     
     let ary=[];
     let index=0;
     while(-1!=(index=this.indexOf(str,pos))){
         let cur=this.slice(pos,index);
         ary.push(cur)
         pos=strLeng+index;
        
     }
     ary.push(this.slice(pos))
     return ary;
 }
 let buffer=Buffer.from("朱_和_人");
 console.log(buffer.mysplit("_").map(item=>{
    return item.toString()
 }))
 