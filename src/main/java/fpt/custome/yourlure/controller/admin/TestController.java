package fpt.custome.yourlure.controller.admin;

import fpt.custome.yourlure.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(value = "/api/upload-file")
public class TestController {

    @Autowired
    private FileService fileService;

    @PostMapping
    public String uploadFile(@RequestParam("file")MultipartFile file){
        try{
            return fileService.saveImage(file);
        }catch (Exception e){
            e.printStackTrace();
        }
        return "fail";
    }
}
