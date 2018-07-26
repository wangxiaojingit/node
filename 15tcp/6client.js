/**
 * 需要实现的功能:
 * 
 * s:name:content //s:代表私聊,name:私聊的人名,content:私聊的内容
 * l:  //当前的在线用户名字列表
 * r:name //r:代表修改名字,name 代表新名字
 * 
 * b:内容 //公聊的内容 
 * 
 * 
 * 
 * 
 */

 let net=require("net");
 let server=net.createServer();
 let client={};
 server.on("connection",(socket)=>{
     
     socket.setEncoding('utf8');
     let key=socket.remoteAddress+"_"+socket.remotePort; //把远程ip 和端口和拼接作为唯一标识.
    
     client[key]={"userName":"默默","socket":socket};
     server.getConnections((error,count)=>{
         socket.write(`当前连接数${count},总共可连接${server.maxConnections}`)
     });
     socket.on("data",(data)=>{
         data=data.replace(/\r\n/g,"");
         let arr=data.split(":");
        switch(arr[0]){
           case "s":
           //私聊
               PrivateChat(socket,arr[1],arr[2])
           break;
           case "b":
           //公聊
                broadcast(socket,arr[1])
           break;
           case "l":
                list(socket)
           //当前用户列表
           break;
           case "r":
                 rename(socket,arr[1]);
           break;
           
           default:
           socket.write("输入的命令有误,不符合协定好的规范");

        }
     })
     socket.on('end',()=>{ //客户端关闭后 销毁
        socket.destroy();
        delete client[key];
    })

 })
 //{key:{userName:"momo",socket:"XXXX"}}
 function list(socket){
     socket.write('当前的用户列表:\r\n');
    Object.values(client).forEach(item=>{
           socket.write(item.userName+"\r\n");
    })
 }
 function rename(socket,newname){
     
    Object.keys(client).forEach(item=>{
       if(client[item].socket==socket){
         client[item].userName=newname;
       } 
    })
 }
 function broadcast(socket,content){
     
    Object.values(client).forEach(item=>{
        if(item.socket!=socket){
            item.socket.write("公聊内容:\r\n"+content);
        }
        
    })
 }
 function PrivateChat(socket,hname,content){
     let fname="";
     Object.values(client).forEach(item=>{
        if(item.socket==socket){
            fname=item.userName;
        }
     })
    Object.values(client).forEach(item=>{
       
        if (item.userName==hname){
           item.socket.write(fname+"@"+hname+":"+content+"\r\n");
        }
    })
 }
 server.maxConnections=4;
 server.listen(3000)