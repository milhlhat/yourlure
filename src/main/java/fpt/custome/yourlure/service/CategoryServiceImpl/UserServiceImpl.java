package fpt.custome.yourlure.service.CategoryServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.UserDtoInp;
import fpt.custome.yourlure.dto.dtoOut.UserDtoOut;
import fpt.custome.yourlure.entity.User;
import fpt.custome.yourlure.repositories.UserRepos;
import fpt.custome.yourlure.security.Provider;
import fpt.custome.yourlure.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepos userRepos;

    // Tạo mapper object
    ModelMapper mapper = new ModelMapper();

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

    @Override
    public Optional<UserDtoOut> getUser(Long id) {

        Optional<User> user = userRepos.findById(id);
        if (user.isPresent()) {
            UserDtoOut result = mapper.map(user.get(), UserDtoOut.class);
            return Optional.of(result);
        }
        return Optional.empty();
    }

    @Override
    public Boolean updateUser(Long id, UserDtoInp userDtoInp) {

        try {
            if (id != null && userDtoInp != null) {
                if (userRepos.findById(id).isPresent()) {
                    User userUpdate = mapper.map(userDtoInp, User.class);
                    userRepos.deleteById(id);
                    userRepos.save(userUpdate);
                } else {
                    return false;
                }
            }
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return true;
    }

}
