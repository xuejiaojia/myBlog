const Router=require("koa-router");

const router=new Router();

//设计主页
router.get("/", async (ctx)=>{
     //title artList
     await ctx.render("index",{"title":"首页"});  //必须加await，渲染页面，这种方式前后端没有分离，分离使用ajax
})
//处理用户登录，注册，路由可以是动态或正则
router.get(/^\/user\/(?=reg|login)/,async (ctx)=>{

     //show  true 注册  false 登录
     const show=/reg$/.test(ctx.path);
     await ctx.render('reg',{show});

})



module.exports=router;