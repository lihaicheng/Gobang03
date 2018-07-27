import com.chao.bean.User;
import com.chao.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"file:src/main/webapp/WEB-INF/applicationContext.xml"})
public class UserLoginServiceTest {
    @Resource
    UserService userService;

    @Test
    public void login() {
        User user = userService.login("chao","123456");
        if (user==null){
            System.out.println("null");
        }else {
            System.out.println(user.getPassword());
        }
    }

}
