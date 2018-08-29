let str="a=1&b=2"

let querystring={
     parse:function(str){
        let obj={} 
        let ary= str.split("&");
        ary.forEach(item => {
           obj[item.split("=")[0]]= item.split("=")[1];
        });
        return obj;
     }
}


module.exports=querystring;