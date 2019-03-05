const {Schema} =require("./config")

const UserSchema=new Schema({
    username:String,
    password:String,
    //用户权限  1基础用户
    role:{
        type: String,
        default: 1
    },
    avatar:{
        type:String,
        default:"/img/default.jpg"
    },
    commentNum:Number,
    articleNum:Number

},{versionKey:false})



module.exports=UserSchema