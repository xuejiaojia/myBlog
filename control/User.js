const {db}=require("../Schema/config")
const UserSchema=require("../Schema/User")
const encrypt=require('../utils/crypto')

/*https://www.cnblogs.com/pfnie/articles/6759105.html*/
//生成user数据模型对象
const User = db.model("users",UserSchema);

//用户注册
module.exports.reg=async (ctx)=>{
    //接受的用户信息
    const user=ctx.request.body
    const username=user.username;
    const password=user.password
    //1.查询用户是否存在,这步是异步使用await
    await new Promise((resolve,reject)=>{
        User.find({username},(err,data)=>{
            if(err) reject(err)
            //查询没出错，判断是否有数据
            if(data.length!==0){
                return resolve("用户已经存在")
            }else{
                //用户名不存在，加密存入数据库
               const _user=new User({
                    username,
                   password:encrypt(password),
                   commentNum:0,
                   articleNum:0
                })
                //promise
                _user.save((err,data)=>{
                    if(err){

                        reject(err)
                    }else{
                        resolve(data)
                    }
                })
            }
        })
    }).then(async data=>{
        if(data){
            //注册成功
            await ctx.render("isOk",{
                static:"注册成功"
            })
        }else{
            //用户名已存在
            await ctx.render("isOk",{
                static:"用户名已存在"
            })
        }
    })
        .catch(async data=>{
            await ctx.render("isOk",{
                static:"注册失败"
            })

        })
}

//用户登录
exports.login=async (ctx)=> {
    const user = ctx.request.body;
    const username = user.username;
    const password = user.password;
    await new Promise((resolve, reject) => {
        User.find({username}, (err, data) => {


            if (err) {
                reject(err)
            }
            if (data.length === 0) return reject('用户名不存在')
            //　用户密码加密 比对
            if (data[0].password === encrypt(password)) {

                return resolve(data)
            }
            resolve('')

        })
    })
        .then(async data => {
        if (!data) {
            return ctx.render('isOk',{status:'密码不正确'})
        }
        //设置用户cookie
        ctx.cookies.set('username',username,{
            domain:'localhost',
            path:'/',
            maxAge:36e5,
            httpOnly:true, //不让客户端访问cookie
            overwrite:false
        })
        ctx.cookies.set('uid',data[0]._id,{
            domain:'localhost',
            path:'/',
            maxAge:36e5,
            httpOnly:false, //true 不让客户端访问cookie
            overwrite:false,
            signed:true  //默认true　显示签名
        })

        ctx.session={
            username,
            uid:data[0]._id,
            avatar:data[0].avatar,
            role:data[0].role
        }
        // 登录成功
        await ctx.render("isOk", {
            status: "登录成功"
        })
    }).catch(async err => {
            await ctx.render("isOk", {
                status: "登录失败"
            })
        })


}

//保持确定用户状态
exports.keepLog=async (ctx,next)=>{
    //cookie 有 更新状态，没有重新登录
    if(ctx.session.isNew){  //session没有,没有登录true，登录undefined
        if(ctx.cookies.get('username')){ //有cookie 设置session
            ctx.session={
                username:ctx.cookies.get('username'),
                uid:ctx.cookies.get('uid')
            }
        }
    }
    await next();
}

//退出
exports.logout=async (ctx)=>{
    //清楚session cookie
    ctx.session=null;
    ctx.cookies.set('uid',null,{
        maxAge:0
    })
    //重定向
    ctx.redirect('/')
}
