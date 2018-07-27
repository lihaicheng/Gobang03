package com.chao.controller;

import com.chao.bean.Msg;
import com.chao.bean.User;
import com.chao.service.UserService;
import com.chao.utils.LoggerUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


/**
 * 用户登录控制
 */
@Controller
public class UserLoginController {

    @Autowired
    UserService userService;

    @ResponseBody
    @RequestMapping(value = "/user/login", method = RequestMethod.POST)
    public Msg userLogin(String username, String password, boolean rememberMe) {
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken(username, password);
        try {
            token.setRememberMe(rememberMe);
            subject.login(token);
            return Msg.success().add("login", "欢迎登录" + username);
        } catch (AuthenticationException e) {
            return Msg.fail().add("login", e.getMessage());
        }
    }

    /**
     * 退出
     *
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/user/logout", method = RequestMethod.GET)
    public Msg logout() {
        try {
            SecurityUtils.getSubject().logout();
            return Msg.success().add("logout", "退出成功！");
        } catch (Exception e) {
            return Msg.fail().add("logout", "退出出现错误！");
        }
    }


}
