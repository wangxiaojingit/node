//如果是自己的文件
```
  let b=require("./b")

```
在require文件的是,首先会先去查找这个路径下面的.js,如果没有找.json,.node,如果都没有
会去找当前路径下的b文件夹>>>>> 如果b文件夹下面有pack.json,找main:入口文件的名字,去加载入口文件
如果没有package.json,直接加载b文件夹下的index.js>>>>>如果也没有,就会在当前路径去找nodeModule下面去找,找不到,去上一级找nodeModule直到.....找到根路径下面的nodeModule..