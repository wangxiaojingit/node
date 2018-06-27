// let b=require("./utils");
// console.log(b)
/**
 * 模拟require原理
 * 
 */
   let path=require("path");
   let fs=require("fs");
   let vm=require("vm");
   function Module(filename){
        this.filename=filename;
        this.exports={};
   }
   Module.extnames=[".js",".json",".node"];
   Module._cache={};//存放缓存
   Module.wrapper=["(function(exports,require,module,__filename,__dirname){","\n})"];
   Module.wrap=function(javascript){
    return Module.wrapper[0]+javascript+Module.wrapper[1];
   }
   Module.extnames["js"]=function(module){
    let javascript=fs.readFileSync(module.filename);
    let js=Module.wrap(javascript);
    vm.runInThisContext(js).call(module.exports,module.exports,rq,module);
    
   }
   Module.extnames["json"]=function(module){
    let javascript=fs.readFileSync(module.filename);
    content=JSON.parse(javascript);
    module.exports=content;
    
   }
   Module.prototype.load=function(module){
       let ext=path.extname(module.filename).slice(1);
       Module.extnames[ext](module);
   }
   Module.resovePath=function(filename){
      let p=  path.resolve(__dirname,filename);
      if(!path.extname(p)){
         //如果没有后缀,需要尝试添加后缀
         for(var i=0;i<Module.extnames.length;i++){
            let newP=p+Module.extnames[i];
            try {
                fs.accessSync(newP);
               
                return newP;
            } catch (error) {
               
            }
         }
         
      }
      return p
   }
   
   function rq(filename){
      filename= Module.resovePath(filename);//得到绝对路径.
      let result=Module._cache[filename];//先去看缓存中是否有值
      if(result){
        return result.exports //缓存中有,直接读取缓存模块中的内容
      }else{
        //缓存中没,先建立一个Module模块
        let module=new Module(filename);
        //去读这个模块存放的绝对路径的内容
        module.load(module);//加载模块的内容
        
        Module._cache[filename]=module;
        return module.exports;
       

      }
   }

let b=rq("./utils");
console.log(b)
