//自己写一个正则去模拟ejs 的render 功能
let fs=require("fs");
let ejs=require("ejs");
let path=require("path");
let result = fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
 let obj={"name":"wxj","age":16}
 let str=result.replace(/<%=([\s\S]*?)%>/g,function(){
      return obj[arguments[1]]
 })
// 
// let str=ejs.render(result,obj);
console.log(str)




