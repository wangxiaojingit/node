let eventEmitter=require("events");
let event=new eventEmitter();
/**
 * event.on 绑定事件
 * event.emit 触发事件
 * event.once 绑定的事件只能触发一次后失效
 * event.removeListener（）//在事件触发前可以移出
 * eventEmitter.defaultMaxListeners() //
 */
function findboy (){
   console.log("findboy")
}
event.on("失恋",findboy)
event.removeListener("失恋",findboy) //在事件触发前可以移出
event.emit("失恋");
console.log(eventEmitter.defaultMaxListeners) //获取eventEmitter最大的默认监听事件的个数
event.setMaxListeners(2)//设置实例上最大的监听事件次数为2，如果超出会发生内存泄漏
console.log(event.getMaxListeners());
event.on("失恋",findboy);
event.on("失恋",findboy);
//event.on("失恋",findboy);
/**
 * 
 * MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 3 失恋 listeners added. Use emitter.setMaxListeners() to increase limit
 */
event.prependListener("失恋",function(){
    console.log("最先触发")
})
event.prependOnceListener("失恋",function(){
    console.log("触发一次失效")

})
event.emit("失恋");