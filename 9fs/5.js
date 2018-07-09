/**
 * 异步删除文件:版本四:
 * 
    有时间再详细研究 18行和20行 为啥加return
 * 
 * 
 */
 let fs=require("fs");
 let path=require("path");
 function removeDir(p,callback){
     fs.stat(p,function(err,statObject){
        if(statObject.isDirectory()){
          //如果是文件目录的时候
          fs.readdir(p,function(err,files){
               files=files.map(item=>path.join(p,item));
               console.log(files)
               function next(index){
                if(index==files.length){ return fs.rmdir(p,callback)}
                 removeDir(files[index],function(){
                  next(index+1);
                 })
               }
               next(0);

          })
        }else{
         //如果是文件夹的时候
         fs.unlink(p,callback)
        }
     })
 }

 removeDir("b",function(){
     console.log("删除成功!")
 })