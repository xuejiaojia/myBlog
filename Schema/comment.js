const {Schema} =require("./config")
const ObjectId=Schema.Types.ObjectId

const commentSchema=new Schema({

    content:String,
    //关联users表，且是ObjectId
    author:{
        type:ObjectId,
        ref:"users"
    },
    //关联到文章集合
    article:{
        type:ObjectId,
        ref:"articles"
    }


},{versionKey:false,
    timestamps:{
        createdAt: 'created'
    }})

module.exports=commentSchema