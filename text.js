



//accum("abcd");    // "A-Bb-Ccc-Dddd"
////accum("RqaEzty"); // "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
//accum("cwAt");    // "C-Ww-Aaa-Tttt"


function accum(str){
  let ary=str.split("");
  let newary=ary.map(function(item,index){
      let first=item.toUpperCase();
      let last=item.toLowerCase().repeat(index);
      return first+last;
  })
 return newary.join("-"); 
  
}

let c=accum("cwAt");   
console.log(c)