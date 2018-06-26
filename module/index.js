
let path=require("path");
let fs=require("fs");
let vm=require("vm");
function Moduled(fileName){
    this.fileName=fileName;//绝对路径
    this.exports={};
}
Moduled._extname=[".js",".json",".node"];//存放扩展名
Moduled._cache={};//key 代表绝对路径， value代表内容
Moduled._resove=function(fileName){
   let p=path.resolve(__dirname,fileName)//获取绝对路径
   if(!path.extname(p)){
     //如果路径后面没有后缀，需要添加
     for(var i=0;i<Moduled._extname.length;i++){
         let f=p+Moduled._extname[i];
        
         try {
            fs.accessSync(f);
            return f;
         } catch (error) {
             
         }
         
     }
   }
   return p
}
Moduled.wrapper=["(function(exports,require,module){","})"];
Moduled.wrap=function(javascriptStr){
    return Moduled.wrapper[0]+javascriptStr+Moduled.wrapper[1];
    
}
Moduled._extname["js"]=function(module){
   //如果是js文件的时候，我们先读内容
  let javascriptStr= fs.readFileSync(module.fileName);
  let str=Moduled.wrap(javascriptStr)
  vm.runInThisContext(str).call(module.exports,module.exports,req,module) ;
}
Moduled.prototype.load=function(fileName){
     //需要判断下这个模块的类型.js?.json
     let _extanmestr=path.extname(fileName).slice(1);
     Moduled._extname[_extanmestr](this)
     
}

function req(fileName){//fileName 有可能没有后缀
   // 我们需要弄出一个绝对了路径，缓存是根据绝对路径来的
   fileName=Moduled._resove(fileName);
   //我们在读文件的时候首先需要判断缓存中是否有
   let cacheModule=Moduled._cache[fileName];
   if(cacheModule){
     //如果缓存中有，就返回
     return  cacheModule.exports
   }
   //如果没有，我们需要先创建一个模块
   let module=new Moduled(fileName);
   //加载这个模块
   module.load(fileName);
   //把值存入缓存
   Moduled._cache[fileName]=module;
   return module.exports;

}

let zf=req("./utils");
console.log(zf)
