const {db}=require("../Schema/config")
const ArticleSchema=require("../Schema/article")
const UserSchema=require("../Schema/User")
const commentSchema=require('../Schema/comment')

const fs=require('fs')
const {join}=require('path')

const Article = db.model("articles",ArticleSchema);
//操作用户。根据用户ｉｄ获取文章列表
const user = db.model("users",UserSchema);
const Comment = db.model("comments",commentSchema);

exports.index = async ctx => {
    if(ctx.session.isNew){
        // 没有登录
        ctx.status = 404
        return await ctx.render("404", {title: "404"})
    }

    const id = ctx.params.id

    const arr = fs.readdirSync(join(__dirname, "../views/admin"))

    let flag = false

    arr.forEach(v => {
        const name = v.replace(/^(admin\-)|(\.pug)$/g, "")
        if(name === id){
            flag = true
        }
    })

    if(flag){
        await ctx.render("./admin/admin-" + id, {
            role: ctx.session.role
        })
    }else{
        ctx.status = 404
        await ctx.render("404", {title: '404'})
    }

}