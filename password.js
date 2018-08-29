
//核心模块
//https://gitee.com/jw-speed/201803
//3028213607@qq.com
//密码:zf1234567
//http://www.zhufengpeixun.cn/docs/html/node%E5%9F%BA%E7%A1%80/buffer.html

//文档
//https://zhufengzhufeng.github.io/201802/html/18.http-1.html

//相关知识点
//http://www.zhufengpeixun.cn/plan/html/16.crypto.html


//xcbobo: wangxj@xcbobo.com    wxj123456
//git :  mima wxjgyj123


//算法课
//https://gitee.com/zhufengpeixun/javascript-alg-practise-1/tree/master/201808/2018%E5%B9%B48%E6%9C%8813%E6%97%A5


// 练习提交的仓库地址 https://gitee.com/zhufengpeixun/javascript-alg-practise-1
// 用户名 1959583119@qq.com 密码 123456ab
// 所有的同学共享这一个账号。










// 写一个函数solution，求比一个数字n小的所有3和5的整数倍数和。
// 比如10，比它小的3、5整数倍数有： 3,5,6,9， 所以和为23。 比如16， 比它小的3，5整数倍数有： 3,5,6,9,10,12,15，所以和为60（15只计算1次）
// 示例
// solution(10) // 23
// solution(16) // 60
// 注意，如果输入负数，返回0








        
let ary=[1,3,5,2];
function sepcile(ary){
    let ary1=ary.filter(item=>item%2==0);
    let ary2=ary.filter(item=>item%2==1);
    return ary1.length>1?ary2[0]:ary1[0];
}
console.log(sepcile(ary))



var A=[1,2,3,4,5,6,7];


function rotate(ary,n){
    return ary.splice(-n,n).concat(ary);
  
}

console.log(rotate(A, 2));

// rotate(A, 1) // [7,1,2,3,4,5,6]
// rotate(A, 2) // [6,7,1,2,3,4,5] 