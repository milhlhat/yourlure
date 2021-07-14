package fpt.custome.yourlure.controller.admin;

import fpt.custome.yourlure.dto.dtoInp.AdminFilterDtoInput;
import fpt.custome.yourlure.dto.dtoInp.AdminStaffDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminStaffDtoOut;
import fpt.custome.yourlure.dto.dtoOut.AdminUserDetailDtoOut;
import fpt.custome.yourlure.dto.dtoOut.AdminUserDtoOut;
import fpt.custome.yourlure.dto.dtoOut.UserAddressDtoOut;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RequestMapping(path = "/admin/user")

public interface AdminUserController {

    @PostMapping(value = "/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    ResponseEntity<Optional<AdminUserDtoOut>> getAll(@RequestBody @Valid AdminFilterDtoInput filter);

    @GetMapping("/find-by-id")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    ResponseEntity<Optional<AdminUserDetailDtoOut>> getUser(@RequestParam Long id);

    @GetMapping("/get-address-user/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    ResponseEntity<List<UserAddressDtoOut>> getAddressUser(@PathVariable Long id);


//    @GetMapping(value = "/{phone}")
////    @PreAuthorize("hasRole('ROLE_ADMIN')")
//    @ApiOperation(value = "${UserController.search}", authorizations = {@Authorization(value = "apiKey")})
//    @ApiResponses(value = {//
//            @ApiResponse(code = 400, message = "Something went wrong"), //
//            @ApiResponse(code = 403, message = "Access denied")})
//    ResponseEntity<Boolean> block(@ApiParam("phone") @PathVariable Long id);

    @GetMapping(value = "/switch-status/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    ResponseEntity<Boolean> switchStatus(@PathVariable Long id);

    //staff-----------------------------------------------------
    @PostMapping(value = "/all-staff")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    ResponseEntity<Optional<AdminStaffDtoOut>> allStaff(@RequestBody @Valid AdminFilterDtoInput filter);

    @GetMapping(value = "/staff/get-by-id")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    ResponseEntity<Optional<AdminStaffDtoOut.StaffDtoOut>> staffGetById(@RequestParam Long id);

    @PostMapping(value = "/staff/update")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    ResponseEntity<Optional<Boolean>> staffUpdateById(@RequestBody AdminStaffDtoInput adminStaffDtoInput, @RequestParam Long id);

    @PostMapping(value = "/staff/save")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    ResponseEntity<Optional<Boolean>> staffSave(@RequestBody AdminStaffDtoInput adminStaffDtoInput);

}
