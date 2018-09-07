import React from "react";
import ReactDom from "react-dom";
/**
 * react 主要分两个部分:1react主要是创建元素 2 react-dom 主要是把虚拟dom渲染到html中
 * 
 */
    // let str=<h1>hello react</h1>;
    // ReactDom.render(str,document.getElementById("root"))

    /**
     * jxs和html 类似,但是它有不同的属性,
     * 1:class要写成className(属性不是能关键字 )
     * 2:style 要写成对象的形式 style={{background:green}},第{}代表是js代码,js环境 
     * 3:for要写成htmlFor
     * 4:dangerouslySetInnerHTML如果要想插入html,类似原生的innerHTML. {__html:temp}
     * 5:{} 代表js,在js 里面如果放函数进行取值,必须return
     * 6:表达式可以取值,三元运算符也支持,void 0 或者null
     */

   //let str=<h1 class="red">我是react</h1>;//控制台报错
   //Warning: Invalid DOM property `class`. Did you mean `className`?in h1 (at 1.js:15)
   let str=<h1 className="red" style={{color:'red'}}>react hello!</h1>
   let str2=(<div>
       <label htmlFor="name">名字</label>
       <input type="text" id="name"></input>
   </div>)
   let temp="<h1 >react lesson one</h1>"
   let str3=(<div dangerouslySetInnerHTML={{__html:temp}}></div>);
   let flag=true;
   let str4=(<div>
       {(()=>"reactFn")()}
       {1+2+3+'word'}
       <div>
           {flag?123:null}
       </div>
   </div>)
   ReactDom.render(str4,window.root)

   
   
   