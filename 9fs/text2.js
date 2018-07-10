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


 let fs=require("fs");
 let path=require("path");
 
 function removeDir(p,callback){
     fs.stat(p,(err,stats)=>{
          if(stats.isDirectory()){
              //如果是文件夹
              fs.readdir(p,(err,files)=>{
                  files=files.map(item=>path.join(p,item));
                  function next(index){
                     if(index==files.length){
                       return  fs.rmdir(p,callback)
                     } 
                     removeDir(files[index],function(){next(index+1)})
                  }
                  next(0)
              })
          }else{
              //如果是文件
              fs.unlink(p,callback)
          }
     })
 }
 let msg="删除成功"
 removeDir("c",function(){
     console.log(msg)
 })

 /**
  *  用广度删除文件夹


  */

  function rmdir(p){
     let ary=[p];
     let index=0;
     let current;
     while(current=ary[index++]){
         if(fs.statSync(current).isDirectory()){
             //如果是文件目录,才去读
             let dirs=fs.readdirSync(current);
             dirs=dirs.map(item=>path.join(current,item));
             ary=[...ary,...dirs];

         }
     }

     for(var i=ary.length;i>=0;i--){
        if(fs.statSync(ary[i]).isDirectory()){
             fs.rmdirSync(ary[i])
        }else{
            fs.unlinkSync(ary[i])
        }

     }
  }

  rmdir("c")


  let fs=require("fs");
  let path=require("path");
  function rmdir(p){
      let ary=[p];
      function next(index){
         if(!ary[index]){return ary;}
        if(fs.statSync(ary[index]).isDirectory()){
            let dirs=fs.readdirSync(ary[index]);
            dirs=dirs.map(item=>path.join(ary[index],item));
            ary=[...ary,...dirs];
            next(index+1)
  
        }else{
            next(index+1)
        }
      }
      next(0);
      console.log(ary)
      
  }

  rmdir("a")