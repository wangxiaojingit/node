

//var obj={filename:"aa",exports:{name:"xj","age":18}}
var obj={filename:"aa",exports:{}};


function change (exports,obj){
   exports.name="lili"
  // exports="zf"
}(obj.exports,obj);

// var obj={"name":"xj"};
// obj="zf";
console.log(obj)
