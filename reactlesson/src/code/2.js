/**
 * react 遍历数组
 * 数组遍历,要带着key属性,react规定如此
 */

 import React from "react";
 import ReactDom from "react-dom";

 let ary=["小","草","播播"];
 function fn(){
    return ary.map((item,key)=>{
          return <div key={key}>{item}</div>;
     })
 }
 let str=fn();

 ReactDom.render(str,window.root);