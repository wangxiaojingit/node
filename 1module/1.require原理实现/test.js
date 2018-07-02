
let path=require("path");
let fs=require("fs");
let vm=require("vm");
function Module(filename){
    this.filename=filename;
    this.exports={};
}
Module._cath={};
Module.extname=[".js",".json",".node"];
Module.wrapper=["(function(module.exports,module,__dirname,rq){","\n})()"];
Module.wrap=function(javascript,module){
   let str= Module.wrapper[0]+javascript+Module.wrapper[1];
   vm.runInThisContext(str).call(module.exports,module.exports,module,req);
}
Module.extname["js"]=function(module){
   let content=  fs.readFileSync(module.filename,"uft8");
   Module.wrap(content,module)
}
Module.extname["json"]=function(module){
    let content=  fs.readFileSync(module.filename,"uft8");
    module= JSON.parse(content);
}
Module.prototype._resolve=function(filename){
    let resolvepath=path.join(__dirname,filename);
    let _extname=path.extname(resolvepath);
    if(!_extname){
       //没有后缀名的时候
        for(var i=0;i<Module.extname.length;i++){
           let p=resolvepath+Module.extname[i];
           try {
               path.access(p);
               return p
           } catch (error) {
               
           }
        }
    }
    return resolvepath

}
Module.prototype.load=function(){
    let filename=this.filename;
    //判断是什么类型的文件,js ,json?
    let ext=path.extname(filename);
    Module.extanme[ext](this);
}

function req(filename){
  filename =  Module.resolve(filename);//获取到绝对路径之后,去读内容
  //判断缓存中有没有
  if(Module._cath[filename]){
     return Module._cath[filename].exports;
  }
  let module=new Module(filename);
  module.load();
  Module._cath[filename]=module;
  return module.exports;
}

let b=require("./1.json");
console.log(b)