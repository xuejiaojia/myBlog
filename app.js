const Koa = require("koa");  //封装的服务
const static = require('koa-static'); //静态资源模块   释放静态资源
const session=require('koa-session')
const router = require('./routers/router');  //路由,从router.js中引入
const views = require('koa-views');   //模板引擎  pug
const body =require("koa-body");
const {join}=require('path');


//SESSION配置对象
const CONFIG={
    key:"Sid",
    maxAge:1000*60*60,  //一小时
    overwrite:true,
    httpOnly:true,
    signed:true,
    rolling:true  //重新刷新过期时间 往后延迟1
}
const app=new Koa();
    app.keys=['session签名'];
    //  配置session
    app.use(session(CONFIG,app))
    app.use(body()); //post解析
    app.use(static(join(__dirname,'/static'))); //配置静态资源
    app .use(views(join(__dirname,"/views"), {   //配置视图模板
            extension: 'pug'
         }));
    app.use(router.routes())    //注册路由
    app.use(router.allowedMethods())


    app.listen(3000,()=>{
        console.log("监听3000")
});    //监听


//创建管理员用户，如果存在则返回
{
    //管理员 admin  admin
const {db}=require("./Schema/config")
const UserSchema=require("./Schema/User")
const encrypt=require('./utils/crypto')
//生成user数据模型对象
const User = db.model("users",UserSchema);

User.find({'username':'admin'})
    .then(data=>{
        if(data.length===0){
            //创建用户
            new User({
                username: 'admin',
                password:encrypt('admin'),
                role:666,
                commentNum:0,
                articleNum: 0
            }).save()
                .then(data=>{
                    console.log("管理员：admin>>>密码：admin")
                })
                .catch(err=>{
                    console.log(err)
                })
        }else{
            console.log("管理员：admin>>>密码：admin")
        }
    })

}