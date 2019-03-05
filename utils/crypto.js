/*加密模块类,node内部模块不需要下载*/
const crypto=require("crypto")

module.exports=function (password,key="123") {
    const hmac=crypto.createHmac("sha256",key)
    hmac.update(password)
    const passHmac=hmac.digest('hex') //获取加密后数据
    return passHmac

}