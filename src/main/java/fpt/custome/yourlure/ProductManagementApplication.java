package fpt.custome.yourlure;

import fpt.custome.yourlure.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication

public class ProductManagementApplication implements CommandLineRunner {
    @Autowired
    UserService userService;

    public static void main(String[] args) {
        SpringApplication.run(ProductManagementApplication.class, args);
    }

//    @Bean
//    public ModelMapper modelMapper() {
//        return new ModelMapper();
//    }

    @Override
    public void run(String... params) throws Exception {
//        User admin = new User();
//        admin.setUsername("admin");
//        admin.setPassword("admin");
//        admin.setPhone("0981808167");
//        admin.setUserEmail("admin@email.com");
//        admin.setRoles(new ArrayList<Role>(Arrays.asList(Role.ROLE_ADMIN)));
//
//        userService.signup(admin);
//
//        User client = new User();
//        client.setUsername("client");
//        client.setPhone("0399804460");
//        client.setPassword("client");
//        client.setUserEmail("client@email.com");
//        client.setRoles(new ArrayList<Role>(Arrays.asList(Role.ROLE_CLIENT)));
//
//        userService.signup(client);
    }

}
