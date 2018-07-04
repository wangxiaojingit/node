let fs=require("fs");
let path=require("path");
fs.readFile(path.resolve(__dirname,"./1.txt"),{flag:"r"},function(err,data){
       console.log(data.toString())
})
fs.writeFile(path.resolve(__dirname,"./8.txt"),"hehe",{flag:"w"},function(err,data){
  
})

//封装copy
function copyFile(resource,target){
       fs.readFile(path.resolve(__dirname,resource),{flag:"r"},function(err,data){
            fs.writeFile(path.resolve(__dirname,target),data,{flag:"w"},function(err){
                if(err){
                    console.log(err)
                }
            })
       })
}
copyFile("./1.txt","./9.txt")

//因为copyFile方法用的比较多,node也给我们写好了一个这样的方法,8.5以上的node版本才能支持,并且这种
//是一次性读完,如果读取的文件内存超过了电脑内存,就会卡机
let fs=require ("fs");
let path=require("path");
fs.copyFile(path.resolve(__dirname,"1.txt"),path.resolve(__dirname,"10.txt"),function(err){
   console.log(err)
})  
//先读一部分,写一部分
let fs=require("fs");
let path=require("path");

let buffer=Buffer.alloc(3);
let size=3;
function copyFile(resource,target){
     //打开要读的文件
    fs.open(path.resolve(__dirname,resource),"r",function(err,rfd){
          //打开要写的文件
          fs.open(path.resolve(__dirname,target),"w",function(err,wfd){
                function next(){
                    fs.read(rfd,buffer,0,size,null,function(err,betysRead){
                        if(betysRead){
                           fs.write(wfd,buffer,0,betysRead,null,function(err,betysWritten){
                                next()
                           })
                        }else{
                            //如果读到没了,我们就应该关闭.在这里需要注意,如果关闭的是写的文件,我们需要
                            //先把写的文件,存放到缓存中,然后再关闭.
                            fs.close(rfd,function(err){console.log(err)});
                            fs.fsync(wfd,function(err){
                                fs.close(wfd,function(err){
                                    if(err){console.log(err)}
                                })
                            })
                            
                        }
                  })
  
                }
                next()
          })
    })
}
copyFile("1.txt","6.txt")