package fpt.custome.yourlure.controller.admin;

import fpt.custome.yourlure.dto.dtoInp.AdminFilterDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminStaffDtoOut;
import fpt.custome.yourlure.dto.dtoOut.AdminUserDetailDtoOut;
import fpt.custome.yourlure.dto.dtoOut.AdminUserDtoOut;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RequestMapping(path = "/admin/user")
public interface AdminUserController {

    @PostMapping(value = "/all")
    ResponseEntity<Optional<AdminUserDtoOut>> getAll(@RequestBody AdminFilterDtoInput filter);

    @GetMapping("/find-by-id")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    ResponseEntity<Optional<AdminUserDetailDtoOut>> getUser(@RequestParam Long id);


//    @GetMapping(value = "/{phone}")
////    @PreAuthorize("hasRole('ROLE_ADMIN')")
//    @ApiOperation(value = "${UserController.search}", authorizations = {@Authorization(value = "apiKey")})
//    @ApiResponses(value = {//
//            @ApiResponse(code = 400, message = "Something went wrong"), //
//            @ApiResponse(code = 403, message = "Access denied")})
//    ResponseEntity<Boolean> block(@ApiParam("phone") @PathVariable Long id);

    @GetMapping(value = "/switch-status/{id}")
    ResponseEntity<Boolean> switchStatus(@PathVariable Long id);

    @PostMapping(value = "/all-staff")
    ResponseEntity<Optional<AdminStaffDtoOut>> allStaff(@RequestBody AdminFilterDtoInput filter);

}
