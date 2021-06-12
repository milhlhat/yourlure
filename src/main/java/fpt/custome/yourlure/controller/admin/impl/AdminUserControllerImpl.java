package fpt.custome.yourlure.controller.admin.impl;


import fpt.custome.yourlure.controller.admin.AdminUserController;
import fpt.custome.yourlure.dto.dtoOut.UserDtoOut;
import fpt.custome.yourlure.entity.User;
import fpt.custome.yourlure.repositories.UserRepos;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class AdminUserControllerImpl implements AdminUserController {

    @Autowired
    UserRepos userRepos;

    @Override
    public ResponseEntity<List<UserDtoOut>> getAll() {
        List<UserDtoOut> result = new ArrayList<>();
        List<User> list = userRepos.findAll();
        for (User item : list) {
            UserDtoOut dtoOut = new ModelMapper().map(item, UserDtoOut.class);
//            List<String> roles = new ArrayList<>();
//            for(UserRole role : item.getRoles()){
//                roles.add(role.getRoleName());
//            }
//            dtoOut.setRole(roles);
            result.add(dtoOut);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> save(UserDtoOut userDtoOut) {
        User user = new ModelMapper().map(userDtoOut, User.class);
        userRepos.save(user);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
