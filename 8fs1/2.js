/**
 * 
 * 
 * 
 */

 //读取一个文件,然后写入

 let fs=require("fs");
 let path=require("path");
 
//  function copy(source,target){
//     fs.readFile(path.resolve(__dirname,source),function(err,data){
//         if(err){return console.log(err)}
//         fs.writeFile(path.resolve(__dirname,target),data,{flag:"w"},function(err,data){
//            if (err) console.log(err);
//         })
//     })
//  }


 /**
  * 因为copy 这个方法比较常用,node 便给我们封装了一个方法, fs.copyFile(source,target,callback);
  * 但是这个方法只有在node版本8.5以上才可以.
  */
 
//  fs.copyFile(path.resolve(__dirname,"1.txt"),path.resolve(__dirname,"3.txt"),function(err){

//  })

 /**
  * fs.copyFile(source,target,callback),除了兼容性,它还存在另一个缺点,就是先把文件都读取
  完之后,存放到内存中,再写入另一个文件.假如内存只有1g,读取的文件内存有20g,这也就会让内存卡死,
  为了解决这个问题,我们出现了下面的方法 fs.read

    fs.read(fd,buffer,offset,position)
    fd:对特定文件的描述,代表要读取的文件标识
    buffer:要存放的buffer地址
    offerset:是buffer中,想要写入的偏移量
    length:要读取的buffer字节数
    position:指定文件要开始读取的位置

    读取的长度length不能大于buffer的长度,不然会报错
  */
 let buffer=Buffer.alloc(3)
  fs.open(path.resolve(__dirname,"./1.txt"),'r',0o666,function(err,fd){
      console.log(fd);
      //fs.read(fd,buffer,offerset,position)
      fs.read(fd,buffer,0,3,0,function(err,bytesRead,buffer){
          console.log(bytesRead)
      })
  })

  /**
   *  写
   *  fs.write(fd,buffer,offset,length,position,callback(err,bytesWrite){})
   * fd:指定文件的标识
   * buffer:要写入的buffer
   * offset:写入的buffer的偏移量,(从buffer的哪个位置开始截取)(o代表读)
   * length:要写入的buffer的长度
   * position:(在目标文件的那个位置开始写入)(p 代表写)
   * 
   */
    //当fs.open里面的flag="w"的时候,如果里面有内容,会把内容覆盖,如果不想覆盖,想要追加
    //需要改成 flag="a" ;但需要注意一点,一旦把此参数改成a,下面的fs.write里面的position参数即将
    //失效
    let fs=require("fs");
    let path=require("path");
    let buffer=Buffer.from("珠峰");
    // fs.open(path.resolve(__dirname,"./5.txt"),"w",0o666,function(err,fd){
    //     fs.write(fd,buffer,3,3,0,function(err,bytesWritten){
    //         if (err) return console.log(err)
    //         console.log(bytesWritten);
    //     })
      
        
    // })

    fs.open(path.resolve(__dirname,"./5.txt"),"a",0o666,function(err,fd){
        fs.write(fd,buffer,3,3,0,function(err,bytesWritten){
            if (err) return console.log(err)
            console.log(bytesWritten);
        })
      
        
    })

    //改写文件中的内容,flag="r+",先去读,读到之后改写,5.txt的内容"峰峰峰峰",想要把第二个峰
    //改成油
    let fs=require("fs");
    let path=require("path");
   
    fs.open(path.resolve(__dirname,"./5.txt"),"r+",0o666,function(err,fd){
         fs.write(fd,Buffer.from("加油"),3,3,3,function(err,bytesWritten){
            console.log(bytesWritten)
         })
    })
/**
 * 封装fs.copy
 * 1. 不论读还是写,都需要打开文件
 * 
 * offset buffer 
 */
let path=require("path");
let fs=require("fs");
let buffer=Buffer.alloc(3);
let size=3;
function copy(source,target){
    fs.open(path.resolve(__dirname,source),"r",0o666,function(err,rfd){
       fs.open(path.resolve(__dirname,target),"w",0o666,function(err,wfd){
           function next(){
                fs.read(rfd,buffer,0,size,null,function(err,bytesRead){
                    if(bytesRead>0){
                        fs.write(wfd,buffer,0,bytesRead,null,function(err,bytesWritten){
                            next();
                        })
                    }else{
                        //如果文件操作完毕,需要关闭,不然fd会一直增加,fd的值有一个最大限制.我们
                        //如果是单纯的读取文件的话,直接关掉即可,如果有写入的文件,我们需要写入文件的
                        //时候,确保强制写到缓存中,然后再关闭
                        fs.close(rfd,function(err){console.log(err)});
                        fs.fsync(wfd,function(err){
                            //强制写入的内容先存放到缓存中,然后再关掉
                            fs.close(wfd,function(err){
                               console.log("已写入,已关闭")
                            })
                        })
                    }
                    
                })
           }
           next();
       })
    })
}
copy("./1.txt","./6txt")
    
