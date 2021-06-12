package fpt.custome.yourlure.controller.storefront.controllerImpl;

import fpt.custome.yourlure.controller.storefront.UserController;
import fpt.custome.yourlure.dto.dtoInp.UserAddressInput;
import fpt.custome.yourlure.dto.dtoInp.UserDtoInp;
import fpt.custome.yourlure.dto.dtoOut.UserAddressDtoOut;
import fpt.custome.yourlure.dto.dtoOut.UserDtoOut;
import fpt.custome.yourlure.entity.address.Country;
import fpt.custome.yourlure.entity.address.District;
import fpt.custome.yourlure.entity.address.Province;
import fpt.custome.yourlure.entity.address.Ward;
import fpt.custome.yourlure.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class UserControllerImpl implements UserController {

    @Autowired
    private UserService userService;

    @Override
    public ResponseEntity<Optional<UserDtoOut>> getUser(Long id) {
        Optional<UserDtoOut> userDtoOut = userService.getUser(id);
        return new ResponseEntity<>(userDtoOut, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> updateUser(Long id, UserDtoInp userDtoInp) {
        Boolean check = userService.updateUser(id, userDtoInp);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Country>> getAllCountry() {
        List<Country> result = userService.findAllCountry();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Optional<Province>> findProvinceById(Long id) {
        Optional<Province> result = userService.findProvinceById(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Optional<District>> findDistrictById(Long id) {
        Optional<District> result = userService.findDistrictById(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Optional<Ward>> findWardById(Long id) {
        Optional<Ward> result = userService.findWardById(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<UserAddressDtoOut>> getAddressUser(Long id) {
        List<UserAddressDtoOut> result = userService.getAddressUser(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> updateAddress(Long addressId, UserAddressInput userAddressInput) {
        Boolean check = userService.updateAddress(addressId, userAddressInput);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

}
