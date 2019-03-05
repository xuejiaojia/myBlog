const {db}=require("../Schema/config")
const ArticleSchema=require("../Schema/article")
const UserSchema=require("../Schema/User")
const commentSchema=require('../Schema/comment')

const Article = db.model("articles",ArticleSchema);
//操作用户。根据用户ｉｄ获取文章列表
const user = db.model("users",UserSchema);
const comment = db.model("comments",commentSchema);

//添加评论
exports.save=async (ctx)=>{
    let message={
        status:0,
        msg:"登录才能发表"

    }
    //判断是否登录
    if(ctx.session.isNew) return ctx.body=message
    //拿到数据
    const data=ctx.request.body
    data.from=ctx.session.uid
    const _comment=new comment(data)
    await _comment.save()
        .then(data=>{
            message={
                status:1,
                msg:"评论成功"
            }
            //更新文章评论计数
            //$inc自增
            Article
                .update({_id: data.article}, {$inc: {commentNum: 1}}, err => {
                    if(err)return console.log(err)
                    console.log("评论计数器更新成功")
                })

            // 更新用户的评论计数器
            User.update({_id: data.from}, {$inc: {commentNum: 1}}, err => {
                if(err) return console.log(err)
            })
        })
        .catch(err=>{
            message={
                status:0,
                msg:err
            }
        })
    ctx.body=message

}