let url=require("url");
let str = 'http://username:password@www.zhufeng.cn:8080/src/index.html?a=1&b=2#hash';
//let {query,search}=url.parse(str,true);
/*

Url {
  protocol: 'http:',
  slashes: true,
  auth: 'username:password',
  host: 'www.zhufeng.cn:8080',
  port: '8080',
  hostname: 'www.zhufeng.cn',
  hash: '#hash',
  search: '?a=1&b=2',
  query: { a: '1', b: '2' },
  pathname: '/src/index.html',
  path: '/src/index.html?a=1&b=2',
  href: 'http://username:password@www.zhufeng.cn:8080/src/index.html?a=1&b=2#hash' }


*/
let obj=url.parse(str); //默认第二个参数为false,为false的时候 obj.qurey 没有解析成对象.
console.log(obj)
/*
Url {
  protocol: 'http:',
  slashes: true,
  auth: 'username:password',
  host: 'www.zhufeng.cn:8080',
  port: '8080',
  hostname: 'www.zhufeng.cn',
  hash: '#hash',
  search: '?a=1&b=2',
  query: 'a=1&b=2',
  pathname: '/src/index.html',
  path: '/src/index.html?a=1&b=2',
  href: 'http://username:password@www.zhufeng.cn:8080/src/index.html?a=1&b=2#hash' }



*/

//获取参数的方法

 let str1 = 'a=1&b=2&c=3';
 let obj={};
 str1.replace(/([^=&]+)=([^=&]+)/g,function(){
    obj[arguments[1]]=arguments[2];
    
    
 })
console.log(obj);
