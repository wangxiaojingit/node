//算法

//1-----原生js 插叙

function short(ary,x){
   let A=ary.find((item)=>{
       return item>x
   })
   let index=ary.indexOf(A);
   if(index){
      return ary.splice(index,0,x)
   }
   ary.push(x);
}
//----简化原生js

function short(ary,x){
    let A=ary.find(item=>{
         return item>x
    })
    let index=ary.indexOf(A)>
    index>-1?ary.splice(index,0,x):ary.push(x);
}
let ary=[1,5,6,8];
short(ary,x);

//2------插叙算法,模拟扑克牌,从最后一位开始比较,预留出一个空位,大于了x的时候,就往空位上放.

function short(ary,x){
   let p=ary.length-1;//最后一位
   while(p>=0&ary[p]>x){
        ary[p+1]=ary[p];
        p--;
   }
   ary[p+1]=x;

}

let ary=[1,5,6,8];
short(ary,2);
console.log(ary)


//用插叙算法排序
function insert(A,i,x){
    let p=i-1;
    while(p>=0&&A[p]>x){
       A[p+1]=A[p];
       p--;
    }
    A[p+1]=x;
}
function insertion_sort(A){
   for(var i=1;i<A.length;i++){ 
       insert(A,i,A[i])  //把A[i]当成插入的元素,每次遍历,都会向后更换插入的项. insert 函数就是依赖上面的学的插入算法.
   }
}
const A=[5,8,1,3,2,4,9];
insertion_sort(A)
console.log(A)
//冒泡排序

/**
 * 内部循环控制:从第一项开始两两项进行比较,大项永远换到后面,经过一轮,最大项就已经放到了最后
 * 
 * 外部循环:经过几次才可以把所有的大项都放到后面,需要比较ary.length-2次,因为当比较到倒数第一项的时候,最后一项已经不用比较了.
 * 
 * 
 */


 //-------1 初始版本
let ary=[9,5,8,1,3];
for (var i=0;i<ary.length-2;i++){
    for (j=0;j<ary.length-1-i;j++){
       let pre=ary[j];
       let next=ary[j+1];
       if(pre>next){
           ary[j]=next;
           ary[j+1]=pre;
       }

    }
}

console.log(ary)

//优化版本,如果在第二轮交互元素的时候,如果没有可交换的,说明已经已经是有序的了,
let ary=[9,5,8,1,3];
for(var i=0;i<ary.length-2;i++){
    let flag=true;
    for(var j=0;j<ary.length-1-i;j++){
         let pre=ary[j];
         let next=ary[j+1];
         if(pre>next){
            ary[j]=next;
            ary[j+1]=pre;
            flag=false; //说明有进行过交换元素
         }
    }
    console.log(ary)

    if(flag){
      break;
    }
}

console.log(ary)
//-----------魏老师版本

function swap(A,i,j){
    const t=A[i] //前一个
    A[i]=A[j]
    A[j]=t
}

function bubble_sort(A){
    for (let i=A.length-1;i>=1;i--){
        for(let j=1;j<=i;j++){
           A[j-1]>A[j]&&swap(A,j-1,j)
        }
    }
}
const A=[5,8,1,3,2,4,6]

bubble_sort(A)

//判断一个数是不是素数.素数是（不包括1）只能被自己1整除的数字，比如2、3、5、7、11、13……都是素数，写一个函数is_prime验证一个数字是否是素数。
/**
 * 思路:只要一个数m从i=2开始取余,循环取到<m 的时候,m都没有被2-(m-1) 整除,那么就是素数
 * 
 * 
 */

is_prime(1) // false
is_prime(100) // false
is_prime(13) // true
is_prime(179426549) // true
is_prime(22801763489) // true

function is_prime(m){
    let flag=true;
    if(m==2){return true;}
    if(m==1){return false;}
    for(var i=2;i<m;i++){
       if(m%i==0){
         return flag=false;
       }
    }
    return flag;
}
console.log(is_prime(22801763489))














