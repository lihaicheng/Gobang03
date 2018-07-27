package com.chao.controller;

import com.chao.bean.Msg;
import com.chao.bean.User;
import com.chao.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @ResponseBody
    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public Msg getUser() {
        Subject subject = SecurityUtils.getSubject();
        String username = (String) subject.getPrincipal();
        User user = userService.getUserByUsername(username);
        return Msg.success().add("user", user);
    }

    /**
     * * 更新用户信息
     * 如果直接发送ajax=PUT形式的请求,获取不到数据
     * * 解决方案；
     * * 我们要能支持直接发送PUT之类的请求还要封装请求体中的数据
     * * 1、配置上HttpPutFormContentFilter；
     * * 2、他的作用；将请求体中的数据解析包装成一个map。
     *
     * @param user
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/user", method = RequestMethod.PUT)
    public Msg updateUser(User user) {
        //从shiro中获得用户名
        Subject subject = SecurityUtils.getSubject();
        String username = (String) subject.getPrincipal();

        user.setUsername(username);

        System.out.println("准备更新：" + user);
        //得到更新后的用户信息
        userService.updateUserByUsername(user);
        return Msg.success().add("user", user);
    }

    @ResponseBody
    @RequestMapping(value = "/user2", method = RequestMethod.GET)
    public Msg getUser2() {
        return getUser();
    }
}
