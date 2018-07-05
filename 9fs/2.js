/**
 * fs.rmdirSync(path) //删除空的文件目录
 * fs.rmdir(path,(err)=>{
 * })
 * fs.unlinkSync(path) //删除文件
 * fs.unlink(path,(err)=>{
 * })
 * 
 */


 let fs=require("fs");
 //fs.mkdir("a"); //创建a文件
 //fs.rmdirSync("a");//删除文件目录a
 //fs.unlinkSync("./b/1.js") //删除1.js文件

 /**
  * 依次删除一个路径下的所有文件


  */
  let fs=require("fs");
  let path=require("path");
  function rmdir(dir){
      let files= fs.readdirSync(dir);//返回的是当前文件目录下的第一次文件[ '1.js', 'e' ]
      for(var i=0;i<files.length;i++){
         let newPath=path.join(dir,files[i]);
         let state=fs.statSync(newPath);
         if(state.isDirectory()){
             //如果是文件夹
             rmdir(newPath)
         }else{
             //如果是文件
             fs.unlinkSync(newPath)
         } 
      }
      fs.rmdirSync(dir)
  }
  rmdir("f")


  