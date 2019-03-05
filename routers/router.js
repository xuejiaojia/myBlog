const Router=require("koa-router");
const user=require("../control/User")
const article=require('../control/article')
const comment=require('../control/comment')
const admin=require('../control/admin')

const router=new Router();

//设计主页,获取文章列表
router.get("/",user.keepLog, article.getList)

//处理用户登录，注册，路由可以是动态或正则
router.get(/^\/user\/(?=reg|login)/,async (ctx)=>{

     //show  true 注册  false 登录
     const show=/reg$/.test(ctx.path);
     await ctx.render('reg',{show});

})

//处理注册用户信息 post,可以使用ajax 接受返回信息，前后端分离
router.post("/user/reg",user.reg)

//处理用户登录信息 post
router.post('/user/login',user.login)

//用户退出
router.get('/user/logout',user.logout)


//文章的发表页面
router.get('/article',user.keepLog,article.addPage)
//文章发表
router.post('/article',user.keepLog,article.add)

//文章分页路由
router.get("/page/:id",article.getList)

//文章详情页
router.get('/article/:id',user.keepLog,article.details)

//发表评论
router.post('/comment',user.keepLog,comment.save)

//文章 评论 上传
router.get("/admin/:id",user.keepLog,admin.index)


router.get('*',async ctx=>{
     await ctx.render('404',{
          title:'404'
     })
})



module.exports= router;