const {db}=require("../Schema/config")
const ArticleSchema=require("../Schema/article")
const UserSchema=require("../Schema/User")
const commentSchema=require('../Schema/comment')

const Article = db.model("articles",ArticleSchema);
//操作用户。根据用户ｉｄ获取文章列表
const user = db.model("users",UserSchema);
const Comment = db.model("comments",commentSchema);

//发表页
exports.addPage=async (ctx)=>{
    await ctx.render('add-article',{
        title:"文章发表页",
        session:ctx.session
    })
}

//发表文章，保存数据库
exports.add=async (ctx)=>{
    //判断是否登录
    if(ctx.session.isNew){
        return ctx.body={
            msg:"用户未登陆",
            status:0
        }
    }
    //用户登录,参数 tips,title content
    const data=ctx.request.body
    //传uid
    data.author=ctx.session.uid
    data.commentNum=0
    //save 回调 和then只能使用一个否则会保存2次
    await new Promise((resolve, reject)=> {
        new Article(data)
            .save((err, data) => {
                if (err) return reject(err)
                resolve(data)
            })
    })
        .then(data=>{
            //发表成功，更新用户文章更新
            user.update({_id:data.author},{$inc:{articleNum:1}},err=>{
                if(err) return console.log(err)
            })

            ctx.body={
                msg:'发表成功',
                status:1
            }
        })
        .catch(err=>{
            ctx.body={
                msg:'发表失败',
                status:0
            }
        })



}

//获取文章列表 所有
exports.getList=async (ctx)=>{

    //动态路由 id ctx.params.id
    let page=ctx.params.id||1
        page--
    //find()多个可以写 不会自动执行， 只有then exec()
    //sort created 升序　　－created 讲叙排序
    //skip　跳过第几条  limit 拿几条数据
    //populate 链表查询
    const maxNum=await Article.estimatedDocumentCount((err,num)=>err?console.log(err):num)
    const artList=await Article.find().sort("-created").skip(5*page).limit(5).populate({
        path:"author",  //指向链表
        select:"username _id avatar"  //链表要查询的值
    })
        .then(data=>data)
        .catch(err=>console.log(err))


    //查找用户头像，文章列表
    await ctx.render("index",{
        session: ctx.session,
        title: "个人博客",
        artList,
        maxNum
    })



}

//文章详情页
exports.details=async (ctx)=>{
    const id=ctx.params.id
    const article=await Article
        .findById(id)
        .populate({
            path:"author",
            select: "username "
        }).then(data => data)

    const comment=await Comment
        .find({article:id})
        .sort("-created")
        .populate('author',"username avatar")
        .then(data=>data)
        .catch(err=>console.log(err))


    await ctx.render("article",{
        title:article.title,
        article,
        comment
    })
}