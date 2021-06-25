package fpt.custome.yourlure.controller.admin;

import fpt.custome.yourlure.dto.dtoOut.AdminUserDtoOut;
import fpt.custome.yourlure.dto.dtoOut.UserDtoOut;
import fpt.custome.yourlure.dto.dtoOut.UserResponseDTO;
import fpt.custome.yourlure.entity.Filter;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Authorization;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping(path = "/admin/user")
public interface AdminUserController {

    @GetMapping(value = "/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @ApiOperation(value = "${UserController.search}", response = UserResponseDTO.class, authorizations = {@Authorization(value = "apiKey")})
    @ApiResponses(value = {//
            @ApiResponse(code = 400, message = "Something went wrong"), //
            @ApiResponse(code = 403, message = "Access denied"), //
            @ApiResponse(code = 404, message = "The user doesn't exist"), //
            @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
    ResponseEntity<List<AdminUserDtoOut>> getAll(@RequestBody Filter filter);

    @PostMapping("/search")
    ResponseEntity<List<UserDtoOut>> search(@RequestBody Filter filter);

    @GetMapping("/{id}")
    ResponseEntity<Optional<UserDtoOut>> getOrderById(@PathVariable("id") Long id);

    @PostMapping("/{id}")
    ResponseEntity<Optional<UserDtoOut>> editOrder(@PathVariable("id") Long id, @RequestBody @Validated UserDtoOut userDtoOut);

    @DeleteMapping("/{id}")
    ResponseEntity<Boolean> deleteOrder(@PathVariable("id") Long id);


}
