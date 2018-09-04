let url=require("url");


let request={
    //这样的方式方便写复杂逻辑
   get url(){
      return this.req.url;
   },
   get path(){
     let {pathname,query} = url.parse(this.req.url,true) ;
     return pathname 
   }
};
module.exports=request;