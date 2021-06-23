package fpt.custome.yourlure.controller.storefront;

import fpt.custome.yourlure.dto.dtoInp.UserDtoInp;
import fpt.custome.yourlure.dto.dtoOut.UserAddressDtoOut;
import fpt.custome.yourlure.dto.dtoOut.UserDtoOut;
import fpt.custome.yourlure.entity.address.Country;
import fpt.custome.yourlure.entity.address.District;
import fpt.custome.yourlure.entity.address.Province;
import fpt.custome.yourlure.entity.address.Ward;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;


@RequestMapping(path = "/user")
public interface UserController {

    @GetMapping("/{id}")
    ResponseEntity<Optional<UserDtoOut>> getUser(@PathVariable Long id);

    @PostMapping("/update")
    ResponseEntity<Boolean> updateUser(HttpServletRequest req, @RequestBody UserDtoInp userDtoInp);

    @GetMapping("/get-all-country")
    ResponseEntity<List<Country>> getAllCountry();

    @PostMapping("/{provinceId}")
    ResponseEntity<Optional<Province>> findProvinceById(@PathVariable(name = "provinceId") Long id);

    @PostMapping("/{districtId}")
    ResponseEntity<Optional<District>> findDistrictById(@PathVariable(name = "districtId") Long id);

    @PostMapping("/{wardId}")
    ResponseEntity<Optional<Ward>> findWardById(@PathVariable(name = "wardId") Long id);

    @PostMapping("/get-address-se")
    ResponseEntity<List<UserAddressDtoOut>> getAddressUser(HttpServletRequest req);



}
