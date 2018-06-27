//newListenner
let eventEmitter=require("events");
let util=require("util");
function Girl(){

}

util.inherits(Girl,eventEmitter) //Girl 继承eventEmiteer
let girl=new Girl();
girl.on("newListener",function(eventname,callback){
   console.log(eventname);
   callback()
})
function findBoy(){
    console.log("newBoy")
}
girl.on("失恋",findBoy);//绑定新事件，会触发上面的newListener
girl.on("失恋",findBoy)//虽然这两次的绑定名字相同，也会触发两次。