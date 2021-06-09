package fpt.custome.yourlure.service.CategoryServiceImpl;

import fpt.custome.yourlure.entity.User;
import fpt.custome.yourlure.repositories.UserRepos;
import fpt.custome.yourlure.security.Provider;
import fpt.custome.yourlure.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepos userRepos;

    public void processOAuthPostLogin(String username) {
//		System.out.println("da login thah cong");
        User existUser = userRepos.findAllByUsername(username);

        if (existUser == null) {
            User newUser = new User();
            newUser.setUsername(username);
            newUser.setProvider(Provider.GOOGLE);
//            newUser.setUserRole(false);

            userRepos.save(newUser);

            System.out.println("Created new user: " + username);
        }

    }
}
