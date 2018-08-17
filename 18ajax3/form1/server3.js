let http=require("http");
let url=require("url");
let querystring=require("querystring");
let formidable=require("formidable");
let path=require("path");
let fs=require("fs");
http.createServer(function(req,res){
    let method=req.method.toLowerCase();//req.method 是大写
   
    let {pathname,query}=url.parse(req.url);
    if(pathname=="/"){
       fs.createReadStream(path.join(__dirname,"3.html")).pipe(res);
    }
    if(pathname=="/form"){
        if(method=="get"){
            let obj=querystring.parse(query);
            res.end(JSON.stringify(obj));
        }else{
            
            var form = new formidable.IncomingForm();
            form.uploadDir =path.join(__dirname,"./dir");
            form.parse(req,function(err,fields,files){
               console.log(fields);
               console.log(files);

            })
            form.on("end",function(){
                res.end("上传成功!")
            })
           
        }
       
    }
    
    
}).listen(3000)


 //如果是post 请求
 //let contentType = req.headers['content-type'];
 // if (contentType === 'application/x-www-form-urlencoded') {
//  let list=[];
//  req.on("data",(data)=>{
//     list.push(data)
//  })
//  req.on("end",()=>{
//      let result=Buffer.concat(list).toString();
     
//      let obj=querystring.parse(result);
//      console.log(obj)
//      res.end(JSON.stringify(obj));
//  })
//}else {
    // 如果是多表单
//}