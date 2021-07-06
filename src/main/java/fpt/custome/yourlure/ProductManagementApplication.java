package fpt.custome.yourlure;

import fpt.custome.yourlure.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication

public class ProductManagementApplication implements CommandLineRunner {
    @Autowired
    private FileService fileService;

    public static void main(String[] args) {
        SpringApplication.run(ProductManagementApplication.class, args);
    }



    @Override
    public void run(String... params) throws Exception {
//        fileService.getFileBase64("customs/string.png");
    }

}
