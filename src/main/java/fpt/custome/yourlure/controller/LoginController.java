package fpt.custome.yourlure.controller;

import fpt.custome.yourlure.entity.User;
import fpt.custome.yourlure.repositories.UserRepos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {

    @Autowired
    private UserRepos userRepos;

//    @GetMapping(value = "/login")
//    public String login(){
//        return "login";
//    }

    @PostMapping("/process_register")
    public String processRegister(@RequestBody User user) {
        try{
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String encodedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encodedPassword);
            userRepos.save(user);
            return "register success";

        }catch (Exception e){
            return "register fail";
        }
    }

    @PostMapping("/get-register")
    public String getRegister(@RequestParam User user){
        try{
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String encodedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encodedPassword);
            userRepos.save(user);
            return "register success";

        }catch (Exception e){
            return "register fail";
        }
    }
}
