//package fpt.custome.yourlure.controller;
//
//import fpt.custome.yourlure.dto.dtoInp.UserDataDTO;
//import fpt.custome.yourlure.dto.dtoOut.UserResponseDTO;
//import fpt.custome.yourlure.entity.Role;
//import fpt.custome.yourlure.entity.User;
//import fpt.custome.yourlure.service.UserService;
//import io.swagger.annotations.*;
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.*;
//
//import javax.servlet.http.HttpServletRequest;
//import java.util.Collections;
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/users")
//@Api(tags = "users")
//public class UserController {
//
//    @Autowired
//    private UserService userService;
//
//    @Autowired
//    private ModelMapper modelMapper;
//
//    @PostMapping("/signin")
//    @ApiOperation(value = "${UserController.signin}")
//    @ApiResponses(value = {//
//            @ApiResponse(code = 400, message = "Something went wrong"), //
//            @ApiResponse(code = 422, message = "Invalid username/password supplied")})
//    public String login(@RequestBody Map<String, String> user) {
//        String phone = user.get("phone");
//        String password = user.get("password");
//        return userService.signin(phone, password);
//    }
//
//    @PostMapping("/signup")
//    @ApiOperation(value = "${UserController.signup}")
//    @ApiResponses(value = {//
//            @ApiResponse(code = 400, message = "Something went wrong"), //
//            @ApiResponse(code = 403, message = "Access denied"), //
//            @ApiResponse(code = 422, message = "Username is already in use")})
//    public String signup(@ApiParam("Signup User") @RequestBody UserDataDTO user) {
//        // just signup with user role client
//        user.setRoles(Collections.singletonList(Role.ROLE_CUSTOMER));
//        return userService.signup(modelMapper.map(user, User.class));
//    }
//
////    @DeleteMapping(value = "/{username}")
////    @PreAuthorize("hasRole('ROLE_ADMIN')")
////    @ApiOperation(value = "${UserController.delete}", authorizations = {@Authorization(value = "apiKey")})
////    @ApiResponses(value = {//
////            @ApiResponse(code = 400, message = "Something went wrong"), //
////            @ApiResponse(code = 403, message = "Access denied"), //
////            @ApiResponse(code = 404, message = "The user doesn't exist"), //
////            @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
////    public String delete(@ApiParam("Username") @PathVariable String username) {
////        userService.delete(username);
////        return username;
////    }
//
//    @GetMapping(value = "/{phone}")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
//    @ApiOperation(value = "${UserController.search}", response = UserResponseDTO.class, authorizations = {@Authorization(value = "apiKey")})
//    @ApiResponses(value = {//
//            @ApiResponse(code = 400, message = "Something went wrong"), //
//            @ApiResponse(code = 403, message = "Access denied"), //
//            @ApiResponse(code = 404, message = "The user doesn't exist"), //
//            @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
//    public UserResponseDTO search(@ApiParam("phone") @PathVariable String phone) {
//        return modelMapper.map(userService.search(phone), UserResponseDTO.class);
//    }
//
//    @GetMapping(value = "/all")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
//    @ApiOperation(value = "${UserController.search}", response = UserResponseDTO.class, authorizations = {@Authorization(value = "apiKey")})
//    @ApiResponses(value = {//
//            @ApiResponse(code = 400, message = "Something went wrong"), //
//            @ApiResponse(code = 403, message = "Access denied"), //
//            @ApiResponse(code = 404, message = "The user doesn't exist"), //
//            @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
//    public List<UserResponseDTO> findAll() {
//        return userService.findAll();
//    }
//
//    @GetMapping(value = "/me")
//    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CUSTOMER')")
//    @ApiOperation(value = "${UserController.me}", response = UserResponseDTO.class, authorizations = {@Authorization(value = "apiKey")})
//    @ApiResponses(value = {//
//            @ApiResponse(code = 400, message = "Something went wrong"), //
//            @ApiResponse(code = 403, message = "Access denied"), //
//            @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
//    public UserResponseDTO whoami(HttpServletRequest req) {
//        return modelMapper.map(userService.whoami(req), UserResponseDTO.class);
//    }
//
//    @GetMapping("/refresh")
//    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CUSTOMER')")
//    public String refresh(HttpServletRequest req) {
//        return userService.refresh(req.getRemoteUser());
//    }
//
//}
