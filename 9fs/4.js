
/**
 * 版本3:async await
 * 
 * 
 */
 
 let path=require("path");
 let fs=require("fs");
 let util=require("util");
 let stat=util.promisify(fs.stat);
 let rmdir=util.promisify(fs.rmdir);
 let readdir=util.promisify(fs.readdir);
 let unlink=util.promisify(fs.unlink)
 async function removeDir(p){
    let statObj=await stat(p);
    if(statObj.isDirectory()){
        //如果是一个文件夹
      let files=  await readdir(p);
      files=  files.map(item=>path.join(p,item));
      files=files.map(item=>removeDir(item))
      await Promise.all(files);
      await rmdir(p);

    }else{
        unlink(p)
    }
 }

 removeDir("a").then(function(){
     console.log("删除成功!")
 })