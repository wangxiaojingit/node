let http=require("http");
let url=require("url");
let querystring=require("querystring");
http.createServer(function(req,res){
    let method=req.method.toLowerCase();//req.method 是大写
   
    let {pathname,query}=url.parse(req.url);
    if(pathname=="/form"){
        if(method=="get"){
            let obj=querystring.parse(query);
            res.end(JSON.stringify(obj));
        }else{
            //如果是post 请求
            let list=[];
            req.on("data",(data)=>{
               list.push(data)
            })
            req.on("end",()=>{
                let result=Buffer.concat(list).toString();
                
                let obj=querystring.parse(result);
                console.log(obj)
                res.end(JSON.stringify(obj));
            })
        }
       
    }
    
    
}).listen(3000)