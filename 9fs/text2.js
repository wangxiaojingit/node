/**
 * 
 * promise
 * 
 * 
 */

 let fs=require("fs");
 let path=require("path");
 function removeDir(p){
      return new Promise(function(resolve,reject){
             fs.stat(p,function(err,statObj){
                  if(statObj.isDirectory()){
                      fs.readdir(p,function(err,files){
                          files=files.map((item)=>path.join(p,item));
                          files=files.map(item=>removeDir(item));
                          Promise.all(files).then(function(){
                              fs.rmdir(p,resolve);
                          })
                      })
                  }else{
                      fs.unlink(p,resolve)
                  }
             })
      })
 }

 removeDir("a").then(function(){
     console.log("删除成功!")
 })