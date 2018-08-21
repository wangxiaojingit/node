// ------WebKitFormBoundaryAUaBfvigtRW6BOPN
// Content-Disposition: form-data; name="name"

// wxj
// ------WebKitFormBoundaryAUaBfvigtRW6BOPN
// Content-Disposition: form-data; name="password"

// aaa
// ------WebKitFormBoundaryAUaBfvigtRW6BOPN
// Content-Disposition: form-data; name="avtor"; filename=""
// Content-Type: application/octet-stream


// ------WebKitFormBoundaryAUaBfvigtRW6BOPN--



Buffer.prototype.split=function(sep){
    sep=Buffer.from(sep);
    let sepLen=sep.length;
    let index=0;
    let ary=[];
    let pos=0;
    while( (pos=this.indexOf(sep,index))>-1){
        let item= this.slice(index,pos);
        ary.push(item);
        index=pos+sepLen;
    }
    ary.push(this.slice(index));
   
    return ary;
 }

 let str=`珠峰**里**还`
 let sep=Buffer.from("**");
 let ary=Buffer.from(str).split(sep);
let c=ary.map(item=>{
    return item.toString()
})

console.log(c)


[ '',
  '\r\nContent-Disposition: form-data; name="name"\r\n\r\nwxj\r\n',
  '\r\nContent-Disposition: form-data; name="password"\r\n\r\n111\r\n',
  '\r\nContent-Disposition: form-data; name="avtor"; filename=""\r\nContent-Type: application/octet-stream\r\n\r\n\r\n',
  '--\r\n' ]