const {Schema} =require("./config")
const ObjectId=Schema.Types.ObjectId

//关联user表
const ArticleSchema=new Schema({
    title:String,
    content:String,
    author:{
        type:ObjectId,
        ref:"users"
    },
    //关联users表，且是ObjectId
    tips:String,
    commentNum:Number    //评论数
},{versionKey:false,
timestamps:{
    createdAt: 'created'
}})



module.exports=ArticleSchema