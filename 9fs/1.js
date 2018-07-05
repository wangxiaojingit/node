/**
 *fs的遍历 
 * 
 * 
 */
let fs=require("fs");
/**
 * //在当前根文件夹下面创建文件夹,但是不能一次创建,必须上级目录存在,才能在下级创建
 * fs.mkdir()
 */
fs.mkdir("a");
function mkdirp(filename){
   let pathAry=filename.split("/");
   for(var i=1;i<=pathAry.length;i++){
      let path=pathAry.slice(0,i).join("/")
      try{  
          //判断目录是否可读   
         fs.access(path,fs.constants.F_OK)
      }catch(e){
         fs.mkdirSync(path)
      }
   }
}
mkdirp("a/b/c")

/**
 *  异步一次性创建多个目录的时候
 *  只要是异步的都不能用for循环,要想到递归
 * 
 * 
 */
let fs=require("fs");
function mkdirSync(path,callback){
    let pathAry=path.split("/");
    function next(index){
       if(index>pathAry.length) return callback();
       let newPath=  pathAry.slice(0,index).join("/");
       fs.access(newPath,function(err){
             if(err){
               //如果不存在,就去创建目录
               fs.mkdir(newPath,function(err){
                   next(index+1)
               })
             }else{
                next(index+1)
                
             }
       })

    }
    next(1)
}

mkdirSync("f/d/c",function(){
    console.log("创建完成!")
})

   
