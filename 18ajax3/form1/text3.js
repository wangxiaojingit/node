let http=require("http");
let url=require("url");
let path=require("path");
let fs=require("fs")
let formidable=require("formidable");
http.createServer(function(req,res){
    let {pathname}=url.parse(req.url)
   if(pathname=="/"){
      fs.createReadStream(path.join(__dirname,"3.html")).pipe(res)
   }else if(pathname=="/form"){
      if(req.method.toLowerCase()=="post"){
        var form = new formidable.IncomingForm();
        var p=path.join(__dirname,"dir");
        console.log("p:"+p)
        form.uploadDir=p;
        form.parse(req, function(err, fields, files) {
            console.log(fields);
            console.log(files);
        });
        form.on("end",function(){
            res.end("上传成功!")
        })



        
            
      }
   }
}).listen(3000)