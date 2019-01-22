layui.use(["element", "laypage"], () => {  //使用layui中的内置模块
    let element = layui.element  //获取实例
    let laypage = layui.laypage
    const $ = layui.$

    element.tabDelete('demo', 'xxx')



    laypage.render({   //执行实例
        elem: "laypage", //分页容器
        count: $("#laypage").data("maxnum"), //服务器的总的数据数
        limit: 2,                           //每页显示的数据条数
        groups: 3,                          //  连续出现的页码个数
        curr: location.pathname.replace("/page/", ""),  //起始页
        jump(obj, f){  //obj   当前分页参数
            $("#laypage a").each((i, v) => {
                let pageValue = `/page/${$(v).data("page")}`
                v.href = pageValue
            })
        }
    })
})