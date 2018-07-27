package com.chao.service;

import com.chao.bean.User;
import com.chao.bean.UserExample;
import com.chao.bean.UserKey;
import com.chao.dao.UserMapper;
import org.apache.shiro.crypto.hash.Hash;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class UserService {

    @Resource
    private UserMapper userMapper;

    /**
     * 用户登录
     *
     * @param username
     * @param password
     * @return
     */
    public User login(String username, String password) {
        UserExample userExample = new UserExample();
        UserExample.Criteria criteria = userExample.createCriteria();
        criteria.andUsernameEqualTo(username);
        Md5Hash md5Hash = new Md5Hash(password, username);
        criteria.andPasswordEqualTo(md5Hash.toString());
        List<User> users = userMapper.selectByExample(userExample);
        if (users == null || users.size() == 0) {
            return null;
        } else {
            return users.get(0);
        }
    }

    /**
     * 通过用户名获得用户
     *
     * @param username
     * @return
     */
    public User getUserByUsername(String username) {
        UserExample userExample = new UserExample();
        UserExample.Criteria criteria = userExample.createCriteria();
        criteria.andUsernameEqualTo(username);
        List<User> users = userMapper.selectByExample(userExample);
        if (users == null || users.size() == 0) {
            return null;
        } else {
            return users.get(0);
        }
    }

    /**
     * 更新用户信息(根据用户名)
     *
     * @param user
     */
    public boolean updateUserByUsername(User user) {
        UserExample userExample = new UserExample();
        UserExample.Criteria criteria = userExample.createCriteria();
        criteria.andUsernameEqualTo(user.getUsername());
        int res = userMapper.updateByExampleSelective(user, userExample);
        System.out.println("updateUser 更新影响行：" + res);
        return res == 1;
    }

    /**
     * 检查用户名是否存在
     *
     * @param username
     * @return
     */
    public boolean checkUsername(String username) {
        UserExample userExample = new UserExample();
        UserExample.Criteria criteria = userExample.createCriteria();
        criteria.andUsernameEqualTo(username);
        List<User> users = userMapper.selectByExample(userExample);
        if (users == null || users.size() == 0) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * 新增用户
     *
     * @param user
     */
    public boolean addUser(User user) {
        if (user == null) {
            return false;
        }
        Md5Hash md5Hash = new Md5Hash(user.getPassword(), user.getUsername());
        user.setPassword(md5Hash.toString());
        try {
            userMapper.insertSelective(user);
            return true;
        } catch (Exception e) {

        }
        return false;
    }
}
