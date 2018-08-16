/**
 * 需求:主进程开了一个子进程,当主进程关闭的时候,子进程还能继续运行
 * 
 * 
 */

let {spawn} = require('child_process');
let path = require('path');

let child = spawn('node',['5.js'],{
    cwd:path.join(__dirname,'text'),
    detached:true,  //要求子进程独立运行
    stdio: 'ignore' // 要求必须不共用 父亲才能断开
});
child.unref(); // 断绝关系，子进程独立运行