let express=require("./test.js");
//let express=require("express")
let app=express();
app.get("/list",(req,res)=>{
    res.end("list")
})

app.post("/user",(req,res)=>{
    res.send({"name":"wxj"});
    res.end();
})
app.get("/user/:id/:name",(req,res)=>{
    res.end(`${req.params.id}-${req.params.name}`)
})
app.all("/all",(req,res)=>{
    res.end("all")
})

app.listen(3000,function(){
    console.log("start server http://localhost:3000")
})

//console.log(app.listen())