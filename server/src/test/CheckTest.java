import com.chao.bean.User;
import com.chao.service.UserService;
import com.chao.utils.CheckUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"file:src/main/webapp/WEB-INF/applicationContext.xml"})
public class CheckTest {
    @Resource
    UserService userService;
    @Test
    public void check() {
        User user = new User();
        user.setUsername("admins");
        user.setPassword("123456a");

        System.out.println( userService.addUser(user));
    }
}
