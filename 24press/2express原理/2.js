/**
 * 中间件:下面的两个路由res.end()的时候里面都是中文,我们需要给他们设置一个相应头:res.setHeader("Content-Type","text/html;charset=utf8");
 * 但是我们一个个设置,代码就冗余了,我们可以用中间件,来设置他们共同的代码.
 * 
 * 中间件还可以匹配路径,如果不写的时候,就是/,如果写了,比如/name,就只能匹配/name 或者/name/1 /name/id ...  
 * 等这样的路由(以/name 开头,但是后面必须是/,如果是/names 就不匹配)
 * 
 * 如果是中间件的时候,layer.method=="middle" 是中间件layer.path==req.path 如果这两相等 才让这个中间件执行
 */

let express=require("./express_2");
let path=require("path");

let app=express();

app.use("/name",function(req,res,next){
  res.setHeader("Content-Type","text/html;charset=utf8");
  next()
})
app.get("/name",(req,res)=>{
    console.log("中间件一");
    res.end("中间件一");
})

app.get("/name/2",(req,res)=>{
  console.log("/2");
  res.end("哈");
})

app.get("/names",(req,res)=>{
   
    res.end("哈哈2");
  })

app.get("/age",(req,res)=>{
    console.log(2);
    res.end("中间件二");
})




app.listen(3000,function(){
    console.log("start server http://localhost:3000")
})

