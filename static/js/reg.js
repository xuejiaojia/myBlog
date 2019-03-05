layui.use(['element','layer'], function(){
    const element = layui.element;
    const $=layui.$;
    const layer = layui.layer;
    let $password=$('.layui-show input[name=password]');
    let $confirmPwd=$('.layui-show input[name=confirmPwd]');

    //一些事件监听
    $confirmPwd.on('blur', function(){
        const pwd=$confirmPwd.val()
        const pwd1=$password.val()
        if(pwd!==pwd1){
            layer.msg('两次密码你一致');
        }
    });

});
