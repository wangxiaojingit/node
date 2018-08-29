/**
 * 得到{id:123,name:wxj}
 * 
 * 
 */

let str='/:id/:name'
let router='/123/wxj'
let params=[];
let strReg=str.replace(/:(\w+)/g,function(a,b){
    params.push(arguments[1]);
    return "(\\w+)"
})
let reg=new RegExp(strReg);
let result=router.match(reg);
let obj=params.reduce((pre,next,index)=>{
    pre[next]=result[index+1];
    return pre
},{})

console.log(obj)

// let obj={}
// params.forEach((item,index)=>{
//   obj[item]=result[index+1];
// })
// console.log(obj)


