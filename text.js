



//var ary=[-4 , 3 ,56 , -15 , 34 , 0 , -14 , 4];
//思路:每次拿出一项,然后涿一跟后面的每一项累加,然后把所有的累加和放到一个数组中
var bigAry=[];
for(var i=0;i<ary.length;i++){
    current=ary[i];//拿到当前项
    var aryresult=[];
    for(let j=i+1;j<ary.length;j++){
         current+=ary[j];
         aryresult.push(current);
    }
    bigAry.push(aryresult);

}
console.log(bigAry);
//遍历bigAry 数组中的每一项,求出最大值;
var res=[];
for(var i=0;i<bigAry.length;i++){
    var item=bigAry[i];
  let big=  Math.max.apply(null,item);
  res.push(big);
}
console.log(res);

let max=Math.max.apply(null,res);
console.log(max+":max")
let index=res.findIndex((item)=>{
    return max==item;
});
let start=index;
console.log(bigAry[index]);
console.log(start);
let end=bigAry[index].findIndex(item=>{
    return item==max
})
console.log("end:"+end);
let endlength=end+1;
let endIndex=endlength+start+1; //包含此项

let resultItem=ary.slice(start,endIndex);
console.log(resultItem);
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