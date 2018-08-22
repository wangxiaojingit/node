/**
 * underscore 节流函数，返回函数连续调用时，func 执行频率限定为 次 / wait
 *
 * @param  {function}   func      回调函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始函数的的调用，传入{leading: false}。
 *                                如果想忽略结尾函数的调用，传入{trailing: false}
 *                                两者不能共存，否则函数不能执行
 * @return {function}             返回客户调用函数   
 */
_.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    // 之前的时间戳
    var previous = 0;
    // 如果 options 没传则设为空对象
    if (!options) options = {};
    // 定时器回调函数
    var later = function() {
      // 如果设置了 leading，就将 previous 设为 0
      // 用于下面函数的第一个 if 判断
      previous = options.leading === false ? 0 : _.now();
      // 置空一是为了防止内存泄漏，二是为了下面的定时器判断
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      // 获得当前时间戳
      var now = _.now();
      // 首次进入前者肯定为 true
	  // 如果需要第一次不执行函数
	  // 就将上次时间戳设为当前的
      // 这样在接下来计算 remaining 的值时会大于0
      if (!previous && options.leading === false) previous = now;
      // 计算剩余时间
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      // 如果当前调用已经大于上次调用时间 + wait
      // 或者用户手动调了时间
 	  // 如果设置了 trailing，只会进入这个条件
	  // 如果没有设置 leading，那么第一次会进入这个条件
	  // 还有一点，你可能会觉得开启了定时器那么应该不会进入这个 if 条件了
	  // 其实还是会进入的，因为定时器的延时
	  // 并不是准确的时间，很可能你设置了2秒
	  // 但是他需要2.2秒才触发，这时候就会进入这个条件
      if (remaining <= 0 || remaining > wait) {
        // 如果存在定时器就清理掉否则会调用二次回调
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        // 判断是否设置了定时器和 trailing
	    // 没有的话就开启一个定时器
        // 并且不能不能同时设置 leading 和 trailing
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };




maskify("4556364607935616") == "############5616"
maskify(     "64607935616") ==      "#######5616"
maskify(               "1") ==                "1"
maskify(                "") ==                 ""

// "What was the name of your first pet?"
maskify("Skippy")                                   == "##ippy"
maskify("Nananananananananananananananana Batman!") 

let str="646079"
str.splice(-4)
function maskify(str){
  return str.length>4?("#").repeat(str.length-4)+str.slice(str.length-4):str
}

console.log(maskify("4556364607935616"))// == "############5616"
console.log(maskify(     "64607935616"))// ==      "#######5616"
console.log(maskify(               "1") )//==                "1"
console.log(maskify(                "") )//==                 ""







let arr=[1,2,3,8]
function bsearch(A, x) {
    let l=0;//定义左边界的索引
    let r=A.length-1;//定义右边界的索引
    let q;
    while(l<=r){
         q=Math.floor((l+r)/2);//求出平均索引
         if (A[q]==x) return q;
         //当平均数小于x的时候
         if(A[q]<x){//如果中间的数小于x 的时候,下次就应该继续往右找
            l=q+1;
            
         }
         //当平均数大于x的是时候,就应该向左查找
         if(A[q]>x){
            r=q-1;
           
         }
    }
    return -1;
} 


console.log(bsearch(arr,3))





let ary=[3,5,7,13,22,25];
   function bsearch(arr,x){
       let l=0;
       let r=ary.length-1;
       let guest;
       if(x>ary[ary.length-1]) return ary.length;
       else if(x<ary[0]) return 0;
       else{
           //如果x的范围在ary中
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
      
      }
       
  
  console.log(bsearch(ary,5)) ;




  function bsearch(A, x){
    let l = 0,
        r = A.length - 1,
        guess
        
    while(l<=r) {
      guess = Math.floor( (l + r) / 2 )
      if(A[guess] === x) return guess
      if(A[guess] > x) {
        if(guess === 0 || A[guess - 1] < x) {
          return guess
        }
        r = guess - 1
      } else {
        if(guess === A.length - 1 || A[guess + 1] > x) {
          return guess + 1
        }
        l = guess + 1
      }
    }
  }
  

  //二分查找
  //A是一个已排序的数组，x是目标值。
  //如果找到目标值，返回目标值在数组中的序号。如果没有找到目标值，返回目标值应该被插入的位置


  function bSearch(ary,x){
     let l=0,r=ary.length-1,guess;
     if(x<0){
       return 0
     }
     if(x>ary[ary.length-1]){
        return ary.length
     }
     while(l<=r){
        guess=Math.floor((l+r)/2);
        if(ary[guess]==x) return guess;
        if(guess+1<=ary.length-1){
          if(ary[guess]<x&&ary[guess+1]>x){
            return guess+1
          }
        }
        if(guess-1>=0){
          if(ary[guess]>x&&ary[guess-1]<x){ 
             return guess;
          }
        }
        
        if(ary[guess]<x){
             l=guess+1
        }else if(ary[guess]>x){
             r=guess-1;
        }
     }
  }

  let  A=[3,5,7,13,22,25];//第一次找到guess 7 index 2


console.log(bSearch(A,30));








function bSearch(ary,x){
  let l=0,r=ary.length-1,guess;
  while(l<=r){
     guess=Math.floor((l+r)/2);
     if(ary[guess]==x) return guess;
     if(ary[guess]<x){
        if(guess==ary.length-1||ary[guess+1]>x){
            return guess+1
        }
        l=guess+1
     }else if(ary[guess]>x){
        if(ary[guess-1]<x||guess==0){
          return guess;
        }
        r=guess-1;
     }
  }
}

//let  A=[3,5,8]; guess=1; -1 guess=0










// 2018年8月22日
// 在一个数组中大部分都是奇数(或偶数），只有1个可能是偶数（或奇数），写一个函数special找到这个不一样的值。
// special( [2, 4, 0, 100, 4, 11, 2602, 36] ) // 11 唯一的奇数

// special( [160, 3, 1719, 19, 11, 13, -21] ) // 160 唯一的偶数
// 写好后请在201808/20180822目录 下面建一个 姓名.md 的文件,请注意代码一定要用反引号包裹一下。

// 上课作业流程
// 每天早上7点钟发布一集新的精品视频，大家可以自由选择时间观看。
// 每天早上7点会发布一道题目，大家需要完成后提交到码云仓库中
// 每天晚上9点公布参考答案。
// 每周六晚上会在腾讯课堂直播答疑并讲解数学、前端等架构知识
// 课程观看地址
// https://ke.qq.com/course/323156

// 现在暂时用这个视频地址https://ke.qq.com/course/251394

// ?练习提交的仓库地址 https://gitee.com/zhufengpeixun/javascript-alg-practise-1
// 用户名 1959583119@qq.com 密码 123456ab
// 所有的同学共享这一个账号。


思路:第一步必须知道要寻找的数是奇数还是偶数,然后再过滤

let ary=[2, 4, 0, 100, 4, 11, 2602, 36];
let falg=true;//偶数
if(ary[0]%2==0){
   //说明第一项是偶数
   if(ary[1]%2==0){
     return falg
   }else{

   }
}else{
  //说明第一项是奇数
}
function special(){
//    //先算出来前三项的余数,
    let result1=ary[0]%2; //0
    let result2=ary[1]%2; //0
    let result3=ary[1]%2; //0
    let flag;
    //
  
}

//我要知道我要找的是奇数还是偶数

   function special(ary){
    let one=ary[0]%2,two=ary[1]%2,three=ary[2]%2,flag;
    if(one==two||one==three){
       flag=one==0?1:0
       return ary.filter(item=>{return item%2==flag})[0]
    }else{
       return ary[0]
    }
 
   }

  console.log(special( [160, 3, 1719, 19, 11, 13, -21] )) 
   

   



