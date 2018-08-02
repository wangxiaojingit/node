



var ary=[3, -6, 123, -945, -231, 112]
function max(ary){
 let obj={};   
    //思路:每次拿出一项,然后逐一跟后面的每一项累加,然后把所有的累加和放到一个数组中
var bigAry=[];//一个二维数组
for(var i=0;i<ary.length;i++){
    current=ary[i];//拿到当前项
    var aryresult=[];
    for(let j=i+1;j<ary.length;j++){
         current+=ary[j];
         aryresult.push(current);
    }
    bigAry.push(aryresult);
}
var res=[];//遍历bigAry 二维数组中的每一项的最大值存放到res中;
for(var i=0;i<bigAry.length;i++){
    var item=bigAry[i];
  let big=  Math.max.apply(null,item);
  res.push(big);
}
let max=Math.max.apply(null,res);//这个是最大值----------------
let index=res.findIndex((item)=>{
    return max==item;
});
let start=index;
let end=bigAry[index].findIndex(item=>{
    return item==max;
})
let endlength=end+1;
let endIndex=endlength+start+1; //包含此项
let resultItem=ary.slice(start,endIndex);

   obj.maxValue=max;
   obj.maxlistItem=resultItem;
   return obj;

}
console.log(max(ary).maxlistItem);
//let length=bigAry[index].length;
//console.log(end)
console.log(max(ary).maxlistItem);
//let length=bigAry[index].length;
//console.log(end)

// [ [ -1, 55, 40, 74, 74, 60, 64 ],
//   [ 59, 44, 78, 78, 64, 68 ],
//   [ 41, 75, 75, 61, 65 ],
//   [ 19, 19, 5, 9 ],
//   [ 34, 20, 24 ],
//   [ -14, -10 ],
//   [ -10 ],
//   [] ]