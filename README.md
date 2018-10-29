
### 说明
  opadatabase模块是用koa来编辑mongodb数据库的，用法简单、易懂。
### 用法
  let opadatabase = require("opadatabase"); <br>
  //默认连接<br>
  let dbUrl =  "mongodb://localhost:27017";<br>
  let dbase = "test";<br>
  opadatabase.initDataBase(dbUrl,dbase).dbFind("user",{name:"祝阳"}).then((response)=>{
    console.log(response)
  })