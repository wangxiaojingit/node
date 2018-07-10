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




 /**
  我有一个疑问,目录a,a下面有b,1.js . 第一次进来的时候,files就是["a/b","a/1.js"],
  第一次走到next函数,next(0),然后执行
  removeDir("a/b",function(){
                  next(index+1);
   });
   ,再执行上面的函数的时候,此时files=[];
   又走到了 if(index==files.length){ return fs.rmdir(p,callback)}这行,
   然后执行callback函数,也就是
       function(){
                  next(index+1);
       }
       再执行next函数的时候,它咋就能找到原来的files[a/b,a/1.js],为啥不是第二次的files[];
  */