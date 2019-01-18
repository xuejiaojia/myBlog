const Koa = require("koa");  //封装的服务
const static = require('koa-static'); //静态资源模块   释放静态资源
const Router = require('koa-router');  //路由
const views = require('koa-views');   //模板引擎  pug
const {join}=require('path');

const app=new Koa();
const router=new Router();
app
    .use(static(join(__dirname,'/static')))  //配置静态资源
    .use(views(join(__dirname,"/views"), {   //配置视图模板
            extension: 'pug'
         }))
    .use(router.routes())       //注册路由
    .use(router.allowedMethods())

app.listen(3000,()=>{
        console.log("jiantingchenggong")
});    //监听