let opadatabase = require("opadatabase");

//默认连接
let dbUrl =  "mongodb://localhost:27017";
let dbase = "test";

opadatabase.initDataBase(dbUrl,dbase).dbFind("user",{name:"祝阳"}).then((response)=>{
    console.log(response)
})