const Koa = require("koa");  //封装的服务
const static = require('koa-static'); //静态资源模块   释放静态资源
const router = require('./routers/router');  //路由,从router.js中引入
const views = require('koa-views');   //模板引擎  pug
const {join}=require('path');

const app=new Koa();

    app.use(static(join(__dirname,'/static'))); //配置静态资源
    app .use(views(join(__dirname,"/views"), {   //配置视图模板
            extension: 'pug'
         }));
    app.use(router.routes());      //注册路由
    app.use(router.allowedMethods());

    app.listen(3000,()=>{
        console.log("监听3000")
});    //监听