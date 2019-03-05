//连接数据库 配置
const mongoose=require("mongoose")
const db=mongoose.createConnection("mongodb://localhost:27017/blog",{useNewUrlParser:true});

//用原生 es6 的promise代替mongoose 自实现的promise
mongoose.Promise=global.Promise

//把moogose中 schema 取出,没变颜色
const Schema = mongoose.Schema;

db.on("error",()=>{
    console.log("连接失败")
})

db.on("open",()=>{
    console.log("连接成功")
})

module.exports={db,Schema}