# 项目说明
- 记录学习Nodejs的过程
- 每个文件夹是单独的一个子项目，可以单独运行
- 每个项目都有对应的md说明文件

# 运行
```shell
# 现在该目录安装所有依赖
npm i 
# 然后需要跑哪个项目 只需要进入对应目录 运行入口js文件即可 
```

# 日志
>2020/3/12
- srs-静态资源服务器
- todo-使用node构建一个简单RESTful Web服务

>2020/3/13-14 
- login-使用node接受表单输入，模拟登陆
- uploadfile-通过表单上传文件
- testDb-连接数据库，完成todo

>2020/3/14
- testMiddleware-初探中间件程序
- srsByConnect-使用connect自带的中间件做静态文件服务

>2020/3/15
- testExpress-使用express完成对todo的重构
- loginByExpress-重构登陆模块，实现token的身份认证