//插入算法：有序数组

//原生js 实现插叙1---

function short(ary,x){
    let self=ary.find(item=>{
        return item>x
    })
    let index=ary.indexOf(x);
    if(self){
       ary.splice(index,0,x)
    }else{
       ary.push(x);
    }
    return ary;
}
let ary=[1,3,5,6,8];
let x=9;
console.log(short(ary,x))

//2实现插叙2----

function short (ary,x){
   let self=ary.find(item=>ary>x);
   let index=ary.indexOf(self);
     index>-1?ary.splice(index,0,x):ary.push(x);
     return ary;
}
let ary=[1,3,5,6,8];
let x=9;
console.log(short(ary,x));
//3-------插入算法，有很多有序的扑克牌，有一张要想插入正确的顺序：假设出一个空位，从最后一张
//开始，如果最后一张大于手中的x，那么就把最后一张牌往后放，

function short(ary,x){
   let p=ary.length-1;//当前的索引
   //p+1 当前空位
   while(p>=0){
    if(ary[p]>x){
        ary[p+1] =ary[p]
        p--
     }else{
       ary[p+1]=x;
       return ary;
     }
   }
    
}
let ary=[1,3,5,6,8];
let x=2;
console.log(short(ary,x));


// 简化

function short(ary,x){
    let p=ary.length-1;//当前的索引
    //p+1 当前空位
    while(p>=0&&ary[p]>x){
         ary[p+1] =ary[p]
         p--
    } 
    ary[p+1]=x;
 }
 let ary=[1,3,5,6,8];
 let x=2;
 short(ary,x)
 console.log(ary);

 //用插叙进行排序
 let ary=[3,5,2,1];
 let newAry=[3]
 console.log(newAry)
 function short(ary,x){
    let p=ary.length-1;//当前的索引
    console.log("p:"+p);
    console.log("ary[p]:"+ary[p])
    //p+1 当前空位
    while(p>=0&&ary[p]>x){
         ary[p+1] =ary[p]
         p--
    } 
    ary[p+1]=x;
    console.log(ary)
 }
 for(var i=1;i<ary.length;i++){
    short(newAry,ary[i])
 }







