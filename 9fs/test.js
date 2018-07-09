/**
 * 
 * 1.用同步的方法删除一个目录下面所有的文件
 */



 let fs=require("fs");
 let path=require("path");
 
 removeDir("a");
 function removeDir(dir){
   let statObject= fs.statSync(dir);
   if(statObject.isDirectory()){
      //如果是文件夹
      let dirs=fs.readdirSync(dir);
      dirs=dirs.map(item=>path.join(dir,item));
      for(var i=0;i<dirs.length;i++){
         var file=dirs[i];
         removeDir(file);
      }
      fs.rmdirSync(dir)
   }else{
       fs.unlinkSync(dir)
   }
 }

/**
 * 2 用promise 异步删除
 * 
 * 
 */

 let fs=require("fs");
 let path=require("path");
 
 function removeDir(dir){
     return new Promise(function(resolve,reject){
          fs.stat(dir,function(err,stats){
              console.log(stats)
               if(stats.isDirectory()){
                  let dirs=fs.readdir(dir,function(err,files){
                      files=files.map(item=>path.join(item,dir));
                      files=files.map(item=>removeDir(item));
                      Promise.all(files).then(function(){
                        fs.rmdir(dir,resolve);
                      })
                     
                  })
               }else{
                   fs.unlink(dir,resolve);
               }
          })
     })
 }

 removeDir("a").then(function(){
     console.log("删除成功!")
 })