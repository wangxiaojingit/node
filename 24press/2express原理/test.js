
let http = require('http');

const fs = require('fs');
http.createServer((req,res)=>{
  req.method
}).listen(300)



let str="/:id/:name";

let c=str.replace(/:(\w+)/g,function(a,args){
    console.log("args:"+args);
    return "(\\w+)";
    
})
console.log(str)

let str="/(\w+)/(\w+)";
let c=new RegExp(str);
console.log(c)

let str="/id/18"

console.log(str.match(c))



/**
 * 需求: 
 * /:id/:name 把这样的路由
 * /123/wxj
 * 变成{id:123,name:wxj}
 * 
 * 
 */

 let str="/:id/:name";
 let str2="/1/2";
 let params=[];
 let result=str.replace(/:(\w+)/g,function(){
     params.push(arguments[1]);
     return "(\\w+)"
 })
 let resultReg=new RegExp(result);
 console.log("params:"+params);
 console.log("result:"+result);
 console.log("resultReg:"+resultReg)
let aa=str2.match(resultReg);
console.log(aa);
let obj={}
console.log(params.length+"---")
params.forEach(item,index=>{
   obj[item]=aa[index+1];
})
console.log(obj)