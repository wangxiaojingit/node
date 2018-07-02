 /**
 * fs.readFile    //异步读取
 * fs.readFileSync //同步读取文件
 * 同步读取会阻塞线程
   
  */
    let fs=require("fs");
    let path=require("path");

   //读取文件的时候默认编码是null,是二进制
  fs.readFile("./1.txt",{flag:"r"},function(err,data){

  })
  fs.writeFile(path.resolve(__dirname,"./1.txt"),"hello",{encoding:"utf8",mode:0o666},function(err,data){

  })
//mode 权限 4读 2写 1可执行
//0o666 可读可写
//0o444 只可读
//0o222 只可写
//0o777 可读可写可执行
