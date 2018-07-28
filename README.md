Gobang03设计说明书


项目名称：五子棋游戏(第三版)

系统构架：BS/CS混合构架

		前后端完全分离，各模块可独立开发

采用技术：

	Server端：使用RESTful风格，生成远程API接口
Spring+SpringMVC+MyBatis+Shiro
					Mybatis：MyBatis逆向工程

	Browser端：用户中心界面，注册，修改信息等
Query+Ajax+BootStrap
					JQuery：validate表单验证，qrcode二维码生成
	
	Client端：下棋客户端，进行游戏，聊天等
Okhttp3,Gson,Swing+AWT

过滤器设置：
编码过滤器>> RESTful过滤器>> CORS跨域过滤器>> Shiro权限过滤器

