package com.chao.shiro;

import com.chao.service.UserService;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * 自定义权限认证(本项目中未使用到此类，使用shiro默认)
 */

public class CustomRealm extends AuthorizingRealm {

    @Autowired
    UserService userService;

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        return null;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        //1.把AuthenticationToken转换为UsernamePasswordToken
        UsernamePasswordToken userToken = (UsernamePasswordToken) token;

        System.out.println("doGetAuthenticationInfo");
        //从主体传过来的认证信息中，获得用户名
        String username = userToken.getUsername();
        //通过用户名从数据库中获取凭证
        String password = String.valueOf(userToken.getPassword());

        SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(username, password, "customRealm");
        //加盐处理
        authenticationInfo.setCredentialsSalt(ByteSource.Util.bytes(username));
        return authenticationInfo;
    }


    public static void main(String[] args) {
        Md5Hash md5Hash = new Md5Hash("123456", "chao");
        System.out.println(md5Hash.toString());
    }
}
