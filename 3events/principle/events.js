function events(){
    //this._events={}
}
 
/**
 * girl.on("newListener",function(eventname,callback){
 *   
 * 
 * })
 *
 *newListener 方法实现原理:在on方法里,进行判断,如果type!="newListener",并且this._events事件池中
  有了"newListener",就让newListener 里面对应的事件数组执行,并把本次on的事件类型和callback传给他
  
 */

 events.prototype.on=function(type,callback){
    if(!this._events){
        this._events=Object.create(null)
    }
    //newListener
    /**
     * 每次on 的时候先看是不是newListener,如果不是,并且事件池中已经有newListener,我们需要把newListener里面的
       数组方法全部执行一遍
     */

     if(type!="newListener"){
        if(this._events["newListener"]){
            this._events["newListener"].forEach(item=>{
                item(type,callback)
            })
        }
     }

    
    //在每次执行on方法的时候,先看看是不是newListener ,
    if(type!=="newListener"){
         //如果on 的时候不是newListener,我们需要看看on 事件池里面有没有newListener
         if(this._events["newListener"]){
             //如果事件池中有就让{newListener:[]}中的方法执行,并把本次on 的事件type 和callback 传给他
             this._events["newListener"].forEach(item=>{
                 item(type,callback)
             })
         }
    }
  if(!this._events[type]){
      this._events[type]=[callback]
  }else{
      this._events[type].push(callback)
  }  
}
//绑定一次事件
events.prototype.once=function(type,callback){
    var that=this;
    function wrap (...arg){
       callback.call(...arg);
       that.removeListener(type,wrap)
    }
    wrap.l=callback;
    this.on(type,wrap)
}



//移除事件        
events.prototype.removeListener=function(type,callback){
   
     if(this._events[type]){
        this._events[type]=this._events[type].filter((item)=>{
            return item!=callback&&item.l!=callback.l
        })
     }
}
events.prototype.emit=function(type,...arg){
      if(this._events[type]){
        this._events[type].forEach((item)=>{
             
             item.call(this,...arg)
        })
      }
    
}

module.exports=events