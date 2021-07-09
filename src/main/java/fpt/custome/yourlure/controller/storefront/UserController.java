package fpt.custome.yourlure.controller.storefront;

import fpt.custome.yourlure.dto.dtoInp.UserAddressInput;
import fpt.custome.yourlure.dto.dtoInp.UserDataDTO;
import fpt.custome.yourlure.dto.dtoInp.UserDtoInp;
import fpt.custome.yourlure.dto.dtoOut.UserAddressDtoOut;
import fpt.custome.yourlure.dto.dtoOut.UserResponseDTO;
import fpt.custome.yourlure.entity.Role;
import fpt.custome.yourlure.entity.address.Country;
import fpt.custome.yourlure.entity.address.District;
import fpt.custome.yourlure.entity.address.Province;
import fpt.custome.yourlure.entity.address.Ward;
import io.swagger.annotations.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RequestMapping(path = "/user")
@Validated
public interface UserController {

    @PostMapping("/update")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    ResponseEntity<Boolean> updateUser(HttpServletRequest req, @RequestBody UserDtoInp userDtoInp);

    @PostMapping("/add-address")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    ResponseEntity<Boolean> addAddress(HttpServletRequest req, @RequestBody UserAddressInput userAddressInput);

    @PostMapping("/update-address")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    ResponseEntity<Boolean> updateAddress(HttpServletRequest req, @RequestBody UserAddressInput userAddressInput, Long userAddressId);

    @GetMapping("/default-address")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    ResponseEntity<Boolean> setDefaultAddress(HttpServletRequest req, @RequestParam Long userAddressId);

    @DeleteMapping("/delete-address")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    ResponseEntity<Boolean> removeUserAddress(@RequestParam Long userAddressId);

    @GetMapping("/get-all-country")
    ResponseEntity<List<Country>> getAllCountry();

    @GetMapping("/find-by-province-id")
    ResponseEntity<Optional<Province>> findProvinceById(@RequestParam Long id);

    @GetMapping("/find-by-district-id")
    ResponseEntity<List<District>> findDistrictById(@RequestParam Long id);

    @GetMapping("/get-all-province")
    ResponseEntity<List<Province>> getAllProvince();

    @GetMapping("/find-by-ward-id")
    ResponseEntity<List<Ward>> findWardById(@RequestParam Long id);

    @PostMapping("/get-address-user")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CUSTOMER')")
    ResponseEntity<List<UserAddressDtoOut>> getAddressUser(HttpServletRequest req);

    @GetMapping("/get-address-user/{id}")
//    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CUSTOMER')")
    ResponseEntity<List<UserAddressDtoOut>> getAddressUser(@PathVariable Long id);

    @GetMapping(value = "/roles")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF') or hasRole('ROLE_CUSTOMER')")
    @ApiOperation(value = "${UserController.roles}", response = UserResponseDTO.class, authorizations = {@Authorization(value = "apiKey")})
    @ApiResponses(value = {//
            @ApiResponse(code = 400, message = "Something went wrong"), //
            @ApiResponse(code = 403, message = "Access denied"), //
            @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
    Set<Role> getRoles(HttpServletRequest req);


    @GetMapping(value = "/me")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF') or hasRole('ROLE_CUSTOMER')")
    @ApiOperation(value = "${UserController.me}", response = UserResponseDTO.class, authorizations = {@Authorization(value = "apiKey")})
    @ApiResponses(value = {//
            @ApiResponse(code = 400, message = "Something went wrong"), //
            @ApiResponse(code = 403, message = "Access denied"), //
            @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
    UserResponseDTO whoami(HttpServletRequest req);

    @GetMapping("/refresh")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CUSTOMER')")
    String refresh(HttpServletRequest req);

    @PostMapping("/signup")
    @ApiOperation(value = "${UserController.signup}")
    @ApiResponses(value = {//
            @ApiResponse(code = 400, message = "Something went wrong"), //
            @ApiResponse(code = 422, message = "phone or email is already in use")})
    String signup(@ApiParam("Signup User") @Valid @RequestBody  UserDataDTO user);

    @PostMapping("/signin")
    @ApiOperation(value = "${UserController.signin}")
    @ApiResponses(value = {//
            @ApiResponse(code = 400, message = "Something went wrong"), //
            @ApiResponse(code = 422, message = "Invalid username/password supplied")})
    String login(@RequestBody UserDataDTO user);

    @PostMapping("/change-password")
    ResponseEntity<Object> changePwd(HttpServletRequest rq,
                                     @RequestParam @NotBlank @Size(min = 6, max = 24, message = "password just contain 6-24 characters!") String oldPassword,
                                     @RequestParam @NotBlank @Size(min = 6, max = 24, message = "password just contain 6-24 characters!") String password);

    @PostMapping("/forgot-password")
    ResponseEntity<Object> forgotPwd(@RequestBody @NotBlank @Size(min = 10, max = 10, message = "phone number just contains 10 characters") String phone);

    @PostMapping("/reset-password")
    ResponseEntity<Object> resetPwd(@RequestParam @NotBlank @Size(min = 10, max = 10, message = "phone number just contains 10 characters") String phone,
                                    @RequestParam @NotBlank @Size(min = 6, max = 24, message = "password just contain 6-24 characters!") String newPwd,
                                    @RequestParam @NotBlank @Size(min = 6, max = 6, message = "otp just has: 6 characters") Integer otp);

}
