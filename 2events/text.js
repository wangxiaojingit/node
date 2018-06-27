let util=require("util");
function A(){

}
A.prototype.say=function(){
    console.log("a")
}
function B(){
    
}
B.prototype.write=function(){
    console.log("b")
}
//让A 继承B 的原型
util.inherits(A,B);
let a=new A();
a.say()