//创建文件目录
let fs=require("fs");

//同步创建目录
function mkdirp(str){
    let ary=str.split("/");
   // ["e", "f", "d"]
    for(var i=1;i<=ary.length;i++){
      let newPath=ary.slice(0,i).join("/");
      try{
        //存在这个目录  
        fs.accessSync(newPath);
      }catch(e){
        //不存在这个目录,我们就需要去创建这个目录
        fs.mkdir(newPath)
      }
     
    }
}

mkdirp("b/e/f");
    