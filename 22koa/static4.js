let fs=require("fs");
//let ejs=require("ejs");
let path=require("path");
let result = fs.readFileSync(path.join(__dirname,'index2.ejs'),'utf8');
let obj={"name":"wxj","age":16,list:[1,2,3]}
 

// function render(renderObj){
//     let templ;
//   with(renderObj){
//      if(name=="jw"){
//        templ= name
//      }else{
//         templ= age
//      }
    
//   }
//   return templ
// }


// function render(renderobj){
//     let head=`let templ \r\n `;
//     head+=`with(renderObj){\r\n`;
//      let content=result.replace(/<%=([\s\S]*?)%>/g,function(){
//          return arguments[1];
//      }) 
//      content=content.replace(/<%([\s\S]*?)%>/g,function(){
//          return arguments[1];
//      })  
//     let tail='}'
//     return head+content+tail;

// }

// let str=render(obj);

// console.log(str);

function render(){
    let head = "let templ; \r\n";
    head += "with (renderObj) { \r\n templ =`";
    let content = result.replace(/<%=([\s\S]*?)%>/g,function(){
        return '${'+arguments[1]+"}";
    })
    content = content.replace(/<%([\s\S]*?)%>/g,function(){
        return "` \r\n " + arguments[1] + "\r\n templ+=`" ;
    });
    let tail = '`} \r\n return templ'
    return head + content + tail;
}
let fn = new Function('renderObj',render());
console.log(fn(obj));