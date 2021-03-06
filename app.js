let MongoClient = require("mongodb").MongoClient;
let dbUrl =  "mongodb://localhost:27017/";
let dbase = "test";

class opaDataBase {
    constructor(){
        console.log("实例化类的时候，就会触发，就是一个构造函数")
    }
    static initDataBase(){
        console.log("静态方法");
        if(!this.singleDataBase){  //判断已经实例化过的构造函数，不用再进行实例化，再次实例化数据为初始化，导致每次实例化都会进行数据库的连接，消耗性能。
            this.singleDataBase=new opaDataBase()
        }
        return this.singleDataBase;
    }
    connect(){
        return new Promise((resolve,rejess)=>{
            if(!this.dbaseStore){  //已经建立连接的方法，直接返回参数
                MongoClient.connect(dbUrl,{ useNewUrlParser: true } ,(err,db)=>{
                    if(err) throw err
                    let dbase = db.db("test");
                    this.dbaseStore=dbase
                    resolve(this.dbaseStore)
                })
            }else{
                resolve(this.dbaseStore)
            }
            
        })
    }
    dbFind(tableName,findContent){
        return new Promise((resolve,rejess)=>{
            this.connect().then((dbase)=>{
                dbase.collection(tableName).find(findContent).toArray((err,response)=>{
                    if(err) throw err;
                    resolve(response)
                })
            })
        })
    }
    dbInsert(tableName,findContent,type){
        let insertNum = "insertOne"
        if(type=="many"){
            insertNum="insertMany"
        }
        return new Promise((resolve,rejess)=>{
            this.connect().then((dbase)=>{
                dbase.collection(tableName)[insertNum](findContent,(err,response)=>{
                    if(err) throw err;
                    resolve(response);
                })
            })
        })
    }
    dbDelete(tableName,findContent,type){
        let insertNum = "deleteOne"
        if(type=="many"){
            insertNum="deleteMany"
        }
        return new Promise((resolve,rejess)=>{
            this.connect().then((dbase)=>{
                dbase.collection(tableName)[insertNum](findContent,(err,response)=>{
                    if(err) throw err;
                    resolve(response);
                })
            })
        })
    }
    dbUpdate(tableName,findContent,updateContent,type){
        let insertNum = "updateOne"
        if(type=="many"){
            insertNum="updateMany"
        }
        return new Promise((resolve,rejess)=>{
            this.connect().then((dbase)=>{
                dbase.collection(tableName)[insertNum](findContent,{$set:updateContent},(err,response)=>{
                    if(err) throw err;
                    resolve(response);
                })
            })
        })
    }
}

let a1 = opaDataBase.initDataBase();
a1.dbFind("user",{}).then((response)=>{
    console.log("response",response);
});

// a1.dbInsert("user",[{name:"hehe",content:"haha"},{name:"hehe",content:"haha1"}],"many").then((response)=>{
//     console.log("response",response) //打印出插入的对象
// })

// a1.dbDelete("user",{name:"hehe"},"many").then((response)=>{   //many删除多个，是指匹配到多个对象
//     console.log("response",response) //打印出删入的对象
// })

// a1.dbUpdate("user",{name:"地址"},{content:"www.baidu.com"},"many").then((response)=>{  //many修改多个，是指匹配到多个对象
//     console.log("response",response) //打印出更新的对象
// })
