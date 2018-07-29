# Gobang03设计说明书


项目名称：五子棋游戏(第三版)

系统构架：BS/CS混合构架

前后端完全分离，各模块可独立开发

## 一，各模块说明：

### 1，Server端：使用RESTful风格，生成远程API接口
        Spring, SpringMVC, MyBatis, Shiro
        Mybatis：MyBatis逆向工程
        过滤器设置：码过滤器>> RESTful过滤器>> CORS跨域过滤器>> Shiro权限过滤器

### 3，Browser端：用户中心界面，注册，修改信息等
        Query, Ajax, BootStrap
        JQuery：validate表单验证，qrcode二维码生成

### 3，Client端：下棋客户端，进行游戏，聊天等
        Okhttp3, Gson, Swing+AWT, Socket
  
## 二，前后断分离及跨域 
 ### 1，异步加载html代码
 由于采用纯Html+CSS+JavaScript的方式，html页面代码会有很多的重复性。因此将部分html代码使用异步加载的方式加载到的html页面中。
 ### 2，跨域加载html代码
 为了解决跨域问题，将模态框的html代码转换成Unicode编码存储在html.js文件中，通过动态加载js文件方式加载Unicode数据。
(在非跨域的项目中，可以直接使用Ajax的方式加载到页面中)

