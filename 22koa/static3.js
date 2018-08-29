//1 用ejs 渲染判断条件
// let fs=require("fs");
// let ejs=require("ejs");
// let path=require("path");
// let result = fs.readFileSync(path.join(__dirname,'index2.ejs'),'utf8');
// let obj={"name":"wxj","age":16,list:[1,2,3]}
 
// let str= ejs.render(result,obj)
// console.log(str)


//2----自己封装一个,首先需要两点知识 1. with 2 创建一个让字符串运行的函数


let fs=require("fs");
//let ejs=require("ejs");
let path=require("path");
let result = fs.readFileSync(path.join(__dirname,'index2.ejs'),'utf8');
let obj={"name":"wxj","age":16,list:[1,2,3]}
 
function render(renderObj){
    let templ;
  with(renderObj){
     if(name=="jw"){
      templ=  name
     }else{
     templ=  age
     }
    
  }
 return templ
}

console.log(render(obj))



// new Function 把字符串 创建成一个函数
// let str = `console.log(obj)`;
// let fn = new Function('obj',str);
// fn(renderObj);
let obj="wxj2"
let str=`console.log(obj)`;

let fn=new Function('obj',str);
fn(obj)
