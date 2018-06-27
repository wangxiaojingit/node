//核心模块
//https://gitee.com/jw-speed/201803
//3028213607@qq.com
//密码:zf1234567


//util 是一个工具类
/**
 * util.promisify();
 * 
 *  util.inspect(),把内容解析相当于console.dir
 * 
 *   util.inherits(a,b)   a继承b的公用属性
 * 
 *  继承的几种方法:
 *  A继承B上面的方法
 * A.prototype.__proto__=B.prototype  //继承了原有的   inherits 相当用了这个方法 改变了对象的__proto__地址
 * A.prototype=Object.create(B.prototype) //改变了原来的prototype 地址
 * Object.setPrototypeOf(A.prototype,B.prototype) //
 * 
 * 
 */
let util=require("util");
let fs=require("fs");
let path=require("path");
let read=util.promisify(fs.readFile);
read(path.join(__dirname,"./2.js"),"utf8").then(function(data){
    //console.log(data);
})
//util.inspect
console.log(util.inspect(Array.prototype,{showHidden:true}));
//util.inherits(A,B) 继承, A继承B的公用属性

function A(){

}
function B(){

}
B.prototype.say=function(){
    console.log("say")
}
util.inherits(A,B);
var a=new A();
a.say()


function C(){

}

function D(){

}
D.prototype.write=function(){
    console.log("d")
}

 var d=new D();
 
 //console.dir(C.prototype.__proto__)
C.prototype.__proto__=D.prototype;
let c=new C();
c.write()

/**
 * setObjectPrototypeOf(obj,__proto__)
   给一个对象obj的__proto__ 设置一个空间地址(只能是对象)
   像下面的实例,把e上的__proto__的方向改成了F.prototype,
   改变 了e的原有方法
 */
function E(){

}
E.prototype.w=function(){
    console.log("w")
}

function F(){

}
F.prototype.say=function(){
    console.log("f")
}
let e=new E();
Object.setPrototypeOf(e,F.prototype);

e.w()

/**
 * A.prototype=Object.create(B.prototype);
 * 直接改变了原有的原型地址
 */

function A(){
    
}
function B(){
    
}
A.prototype.write=function(){
    console.log("a");
}
B.prototype.say=function(){
        console.log("say")
}
A.prototype=Object.create(B.prototype);
let a=new A();
a.say()

