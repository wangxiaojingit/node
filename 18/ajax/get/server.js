let http=require("http");
let url=require("url");

http.createServer(function(req,res){
    let {query}=url.parse(req.url,true);
    console.log(query);

   
}).listen(3000)