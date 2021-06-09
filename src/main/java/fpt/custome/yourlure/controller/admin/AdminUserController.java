package fpt.custome.yourlure.controller.admin;

import fpt.custome.yourlure.dto.dtoOut.UserDtoOut;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequestMapping(path = "/admin/user")
public interface AdminUserController {

    @GetMapping("/all")
    ResponseEntity<List<UserDtoOut>> getAll();

    @PostMapping("/add")
    ResponseEntity<Boolean> save(@RequestBody UserDtoOut userDtoOut);

}
