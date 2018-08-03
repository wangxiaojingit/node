
//var ary=[3, -6, 123, -945, -231, 112];
var ary=[1,-2,3,-3,2,2,-2];
//第一步:求出所有的子序列组合;[[3],[3,-6]....]
var allary=[];//所有的子序列-------------------------
//let maxsum=null;//最大的序列之和------------
for(var i=0;i<ary.length;i++){
    let cur=ary[i];
    allary.push([ary[i]]);
    
    for(var j=i+1;j<ary.length;j++){
        let item=ary.slice(i,j+1);
        allary.push(item);
    }


    
}
//第二步骤:累加求和,求出最大的和
let maxsum=null;
let totalAry=[];//求出所有子序列的和
let index=null;//代表maxsum 在totalAry中对应的索引,也就是子序列中对应和最大的那项子序列
for (var i=0;i<allary.length;i++){
    let total=allary[i].reduce((pre,cur)=>{
         return pre+cur;
    });
    totalAry.push(total);
    maxsum=maxsum>total?maxsum:total;
    //第三步骤:找出 maxsum 在totalAry 中的索引
     index= totalAry.findIndex((item)=>{
            return item==maxsum
    })
}
   console.log(allary[index])


   let nums=[3, -6, 123, -945, -231, 112];
   var maxSubArray = function(nums) {
        // 初始化源数组，初始化An为结束的最大值
        let A = nums;
        let dp = [];
        let maxSum = A[0];
        dp[0] = A[0];
        for(let i = 1; i < A.length; i++) {
            //状态转移公式
            dp[i] = max(A[i], dp[i-1] + A[i])
            maxSum = dp[i] > maxSum ? dp[i] : maxSum;
        }
        return maxSum;
    }
    
    function max(a, b) {
        return a > b ? a : b;
    }
    
    maxSubArray(nums);