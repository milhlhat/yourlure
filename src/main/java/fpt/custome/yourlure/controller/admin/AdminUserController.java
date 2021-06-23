package fpt.custome.yourlure.controller.admin;

import fpt.custome.yourlure.dto.dtoOut.UserDtoOut;
import fpt.custome.yourlure.entity.Filter;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping(path = "/admin/user")
public interface AdminUserController {

    @GetMapping("/all")
    ResponseEntity<List<UserDtoOut>> getAll();

    @PostMapping("/search")
    List<UserDtoOut> search(@RequestBody Filter filter);

    @GetMapping("/{id}")
    Optional<UserDtoOut> getOrderById(@PathVariable("id") Long id);

    @PostMapping("/add")
    ResponseEntity<Boolean> save(@RequestBody UserDtoOut userDtoOut);

    @PostMapping("/{id}")
    Optional<UserDtoOut> editOrder(@PathVariable("id") Long id, @RequestBody @Validated UserDtoOut userDtoOut);

    @DeleteMapping("/{id}")
    Boolean deleteOrder(@PathVariable("id") Long id);


}
