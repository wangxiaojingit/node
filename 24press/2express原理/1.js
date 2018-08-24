let express=require("./express2.js");

//console.log(express)

let app=express();
app.get("/list",(req,res)=>{
    res.end("list")
})

// app.post("/user",(req,res)=>{
//     res.end("user-post")
// })
app.all("*",(req,res)=>{
    res.end("user-all")
})
app.listen(3000,function(){
    console.log("start server http://localhost:3000")
})