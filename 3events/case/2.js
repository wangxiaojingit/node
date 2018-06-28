let eventEmitter=require("events");
let event=new eventEmitter();
/**
 * event.on 绑定事件
 * event.emit 触发事件
 * event.once 绑定的事件只能触发一次后失效
 * event.removeListener（）//在事件触发前可以移出
 * eventEmitter.defaultMaxListeners //eventEmitter 上默认的最大绑定事件个数
 * event.setMaxListeners(num)//给实例设置最大的监听事件次数
 * event.getMaxListeners(num)
 * event.eventNames()//返回的是 一个数组:[ '失恋', '减肥' ],绑定的事件数组.
 * event.prependListener(eventname,fn),当触发eventname事件的时候,最先执行这个函数.
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
event.on("减肥",findboy);
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
console.log(event.eventNames())