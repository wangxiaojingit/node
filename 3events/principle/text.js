function events(){

}
//defaultMaxListeners events类上默认最大的监听10;
events.defaultMaxListeners=10;
//addListener(eventName, listener)
events.prototype.addListener=events.prototype.on;
//获取所有的事件名字
events.prototype.eventNames=function(){
  return  Object.keys(this._events)
}
//setMaxListeners()
events.prototype.setMaxListeners=function(num){
    this.setMaxListeners=num;
}
//getMaxListeners()
events.prototype.getMaxListeners=function(){
  return  this.setMaxListeners||events.defaultMaxListeners
}
//绑定事件
events.prototype.on=function(type,callback,flag){
    if (!this._events) this._events=Object.create(null);
    if(!this._events[type]){
        this._events[type]=[callback]
    }else{
        if(flag){
            this._events[type].unshift(callback)
        }else{
            this._events[type].push(callback)
        }
        
    }
    if(this._events[type].length==this.getMaxListeners()+1){
             console.log("内存泄露")
    }
}

events.prototype.removeListener=function(){
    this._events=Object.create(null);
}
//removeAllListeners([eventName])
events.prototype.removeAllListeners=function(type){
    this._events[type]=[];
}
//绑定一次事件
events.prototype.once=function(type,callback,flag){
   
   function wrap(...arg){
       callback.call(this,...arg);
       this.removeListener(type,wrap)
   } 
   wrap.l=callback;
   this.on(type,wrap,flag)
}
//prependListener(eventName, listener)
event.prototype.prependListener=function(type,callback){
   this.on(type,callback,true)
}
//prependOnceListener(eventName, listener)
event.prototype.prependOnceListener=function(type,callback){
    this.once(type,callback,true)
 }
//触发事件
events.prototype.emit=function(type,...arg){
    if (!this._events) this._events=Object.create(null);
    if(this._events[type]){
        this._events[type].forEach(item=>{
            debugger;
            item.call(this,...arg)
        })
    }
}
//移除事件
events.prototype.removeListener=function(type,callback){
    if (!this._events) this._events=Object.create(null);
    if(this._events[type]){
       this._events[type]=this._events[type].filter(item=>{
           // return item!==callback && item.l!==callback.l;
           return item!=callback && item.l!=callback.l
       })
    }
}
module.exports=events