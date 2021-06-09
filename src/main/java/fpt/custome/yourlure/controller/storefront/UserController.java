package fpt.custome.yourlure.controller.storefront;

import fpt.custome.yourlure.dto.dtoInp.UserDtoInp;
import fpt.custome.yourlure.dto.dtoOut.UserDtoOut;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RequestMapping(path = "/user")
public interface UserController {

    @GetMapping("/{id}")
    ResponseEntity<Optional<UserDtoOut>> getUser(@PathVariable Long id);

    @PostMapping("/{id}")
    ResponseEntity<Boolean> updateUser(@PathVariable Long id, @RequestBody UserDtoInp userDtoInp);

    @PostMapping("/save")
    ResponseEntity<Boolean> saveCate(@RequestBody UserDtoInp userDtoInp);

}
