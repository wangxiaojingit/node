



//accum("abcd");    // "A-Bb-Ccc-Dddd"
////accum("RqaEzty"); // "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
//accum("cwAt");    // "C-Ww-Aaa-Tttt"


// function accum(str){
//   let ary=str.split("");
//   let newary=ary.map(function(item,index){
//       let first=item.toUpperCase();
//       let last=item.toLowerCase().repeat(index);
//       return first+last;
//   })
//  return newary.join("-"); 
  
// }

// let c=accum("cwAt");   
// console.log(c)

// 写一个函数求数组的最大值和最小值

// highAndLow("1 2 3 4 5"); // return "5 1"
// highAndLow("1 2 -3 4 5"); // return "5 -3"
// highAndLow("1 9 3 4 -5"); // return "9 -5"




// 写一个函数判断字符串中x的数量和o的数量是否相等（忽略大小写）：

// XO("ooxx") => true
// XO("xooxx") => false
// XO("ooxXm") => true
// XO("zpzpzpp") => true // 没有x也没有o，所有相等，都为0
// XO("zzoo") => false




// 写一个函数判断一个数字是不是某个整数的平方。
// is_square (-1) # => false
// is_square   0 # => true
// is_square   3 # => false
// is_square   4 # => true
// is_square  25 # => true
// is_square  26 # => false
// 写好后请在201808/20180816目录 下面建一个 姓名.md 的文件,请注意代码一定要用反引号包裹一下。2018年8月16日
// 写一个函数判断一个数字是不是某个整数的平方。
// is_square (-1) # => false
// is_square   0 # => true
// is_square   3 # => false
// is_square   4 # => true
// is_square  25 # => true
// is_square  26 # => false


function is_square(num){

    if(Number.isNaN(Math.sqrt(num))){
        return false
    }else{
       if(Math.sqrt(num).toString().indexOf(".")>0) {
           return false
       }else{
           return true;
       }
    }
}
function is_square(num){
   let val=Math.sqrt(num).toString();
   return val=="NaN"?false:val.indexOf(".")>0?false:true;
}
console.log(is_square(-1) )
console.log(is_square(0) )  
console.log(is_square(3) ) 
console.log(is_square(4))  
console.log(is_square(25) ) 
console.log(is_square(26) )



function squareDigits(num){
    
  return num.toString().split("").map(item=>{
       return Math.pow(item,2)
   }).join("")

   
}

console.log(squareDigits(9119) )// 811181



//二分查找函数

let arr=[1,2,3,8]

             
function bsearch(A, x) {
    let l=0;//定义左边界的索引
    let r=arr.length-1;//定义右边界的索引
    let q=Math.floor(l+r)/2;//求出平均索引

    while(l<r){
         if (A[q]==x) return q;
         //当左边界小于右边界的时候
         if(A[q]<x){//如果中间的数小于x 的时候,下次就应该继续往右找
            l=q+1;
            q=Math.floor(l+r)/2;

         }
         if(A[q]>x){
            l=q-1;
            q=q=Math.floor(l+r)/2;
         }
    }

    return -1;

} 


console.log(bsearch(arr,3))


let ary=[4,5,8];
   function bsearch(arr,x){
       let l=0;
       let r=ary.length-1;
       let guest;
       while(l<=r){
           guest=Math.floor((l+r)/2);
           if(ary[guest]==x) return guest;
           if(ary[guest]<x&&ary[guest+1]>x){
               return guest+1;
           }
           if(ary[guest]>x&&x>ary[guest-1]){
              return guest-1;
           }
           if(ary[guest]<x){
               l=guest+1;
           }
           if(ary[guest]>x){
              r=guest-1;
           }
       }
   }
  console.log(bsearch(ary,3)) ;