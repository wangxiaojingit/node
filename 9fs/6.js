/**
 * 
 * 广度优先:rmdir
 * 
 */
let path=require("path");
let fs=require("fs");

function removeDir(p){
    let ary=[p];
    let index=0;
    let current;
    while(current=ary[index++]){
        let stats=fs.statSync(current);
        if(stats.isDirectory()){
          let dirs=fs.readdirSync(current);
          dirs=dirs.map(item=>path.join(current,item))
          ary=[...ary,...dirs]
        }
    }
    console.log(ary)
    
    for(var i=ary.length-1;i>=0;i--){
        let cur=ary[i];
        if(fs.statSync(cur).isDirectory()){
            //如果是文件夹的时候
            fs.rmdirSync(cur)
        }else{
            //如果是文件的时候
            fs.unlinkSync(cur)
        }
    }

}

removeDir("c")