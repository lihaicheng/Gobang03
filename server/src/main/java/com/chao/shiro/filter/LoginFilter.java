package com.chao.shiro.filter;

import com.chao.utils.LoggerUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.AccessControlFilter;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

/**
 * 开发公司：SOJSON在线工具 <p>
 * 版权所有：© www.sojson.com<p>
 * 博客地址：http://www.sojson.com/blog/  <p>
 * <p>
 * <p>
 * 判断登录
 * <p>
 * <p>
 * <p>
 * 区分　责任人　日期　　　　说明<br/>
 * 创建　周柏成　2016年6月2日 　<br/>
 *
 * @author zhou-baicheng
 * @version 1.0, 2016年6月2日 <br/>
 * @email so@sojson.com
 */
public class LoginFilter extends AccessControlFilter {

    @Override
    protected boolean isAccessAllowed(ServletRequest request,
                                      ServletResponse response, Object mappedValue) throws Exception {

        Subject subject = SecurityUtils.getSubject();
        Object token = subject.getPrincipal();

        if (null != token || isLoginRequest(request, response)) {// && isEnabled()
            return Boolean.TRUE;
        }

        System.out.println("当前请求：" + request.getServerName());
        // 判断是否是ajax请求，但是，跨域请求时，无法正确判断，X-Requested-With: XMLHttpRequest
        //if (ShiroFilterUtils.isAjax(request)) {//
        Map<String, Object> resultMap = new HashMap<>();
        LoggerUtils.debug(getClass(), "当前用户没有登录，并且是Ajax请求！");
        resultMap.put("code", 403);
        resultMap.put("msg", "shiro:当前用户没有登录！");//当前用户没有登录！
        ShiroFilterUtils.out(response, resultMap);
        //  }

        return Boolean.FALSE;
    }

    @Override
    protected boolean onAccessDenied(ServletRequest request, ServletResponse response)
            throws Exception {
        //保存Request和Response 到登录后的链接
        saveRequestAndRedirectToLogin(request, response);
        return Boolean.FALSE;
    }

}
