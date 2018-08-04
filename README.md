# Gobang03设计说明书


项目名称：五子棋游戏(第三版)

系统构架：BS/CS混合构架

前后端完全分离，各模块可独立开发

        成都工业学院 15级软件工程 学生作品  2018.07.26-2018.07.29
        此版本基于上一版本：Gobang v02 https://github.com/bzsome/Gobang02
## 下一版本：Gobang v04
        采用Spring Boot构架，标准的RESTful-api风格，OAuth2.0授权接口
        前后端分离后，授权认证较为复杂，最近正在积累授权安全相关知识。
        
## 一，各模块说明：

 ### 1，Server端：使用RESTful风格，生成远程API接口
        SSM框架：Spring, SpringMVC, MyBatis
        权限控制：Shiro单点登录控制
        MyBatis：mybatis-generator逆向工程
        过滤器设置：码过滤器>> RESTful过滤器>> CORS跨域过滤器>> Shiro权限过滤器

 ### 2，Browser端：用户中心界面，注册，修改信息等
        纯静态页面：HTML，CSS，jQuery, Ajax, BootStrap
        JQuery插件：validate表单验证，qrcode二维码生成
        异步加载html中重复的代码；能够直接用资源管理器以file:协议打开

 ### 3，Client端：下棋客户端，进行游戏，聊天等
        Okhttp3, Gson, Swing+AWT, Socket
        使用原Gobang02源代码，未更改本模块代码，如需相关代码，请查看Gobang V02
        
## 二，前后断分离及跨域 
 ### 1，异步加载html代码
        由于采用纯Html+CSS+JavaScript的方式，html页面代码会有很多的重复性。因此将部分html代码使用异步加载的方式加载到的html页面中。
        
 ### 2，跨域加载html代码
        为了解决跨域问题，将模态框的html代码转换成Unicode编码存储在html.js文件中，通过动态加载js文件方式加载Unicode数据。
        (在非跨域的项目中，可以直接使用Ajax的方式加载到页面中)
        
 ### 3.读取异步加载的数据
        由于很多数据是异步加载的，因此数据的读取也是异步的。本项目采用后来元素事件绑定法，来传递消息。
        
        //发送事件消息，告知用户信息加载完成！
         $("#userdata_Tip").click();
         
        //接收事件消息，处理用户信息
        $(document).on("click", "#userdata_Tip", function () {
                show_user_bar();
                show_user_center();
        });
  ### 4.RESTful风格
       由于网络运营商可能会拦截错误的页面，因此，部分页面未使用标准的构架风格。
       将在下一版本使用标准的RESTful构架风格

