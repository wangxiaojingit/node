let EventEmmiter=require("events");
let http=require("http");
let context=require("./context.js");
let request=require("./request");
let response=require("./response");
class application extends EventEmmiter {
    constructor(){
        super();
        this.fn;
        this.context=context;
        this.request=request;
        this.response=response;
    }
    use(fn){
      this.fn=fn;
    }
    createContext(req,res){
        //Object.create()不会修改原来的context,还可以新增一些属性.
       let ctx=Object.create(this.context);
       let request=Object.create(this.request);
       let response=Object.create(this.response);

       ctx.request=request;//自己封装
       ctx.response=response;//自己封装

       ctx.req=ctx.request.req=req;
       ctx.res=ctx.response.res=res;
       return ctx;

       
    }
    //server 回调
    handdleRes(req,res){
        let context=this.createContext(req,res);
        this.fn(context);
    }
    listen(){
      let server=  http.createServer(this.handdleRes.bind(this));
      server.listen(...arguments);
    }
}

module.exports=application;