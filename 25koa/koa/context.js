let context={};

function daili(pro,proname){
   return context.__defineGetter__(proname,function(){
       return this[pro][proname]
   })
}

daili("response","body");
module.exports=context;



var o = {};
o.__defineSetter__('value', function(val) { this.anotherValue = val; });
o.value = 5;
console.log(o.value); // undefined
console.log(o.anotherValue); // 5

var obj3={}

obj3.__defineSetter__("value",function(value){this.an=value})