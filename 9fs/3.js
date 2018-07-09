/**
 * promise 版删除:版本2
 * 
 * 
 */

let fs=require("fs");
let path=require("path");


function removeDir(dir){
    return new Promise(function(resolve,reject){

         fs.stat(dir,function(err,statObject){
           
              if(statObject.isDirectory()){
                     fs.readdir(dir,function(err,files){
                     files=files.map(item=>path.join(dir,item));
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





