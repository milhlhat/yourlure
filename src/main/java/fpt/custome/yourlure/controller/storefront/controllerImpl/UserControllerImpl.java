package fpt.custome.yourlure.controller.storefront.controllerImpl;

import fpt.custome.yourlure.controller.storefront.UserController;
import fpt.custome.yourlure.dto.dtoInp.UserAddressInput;
import fpt.custome.yourlure.dto.dtoInp.UserDataDTO;
import fpt.custome.yourlure.dto.dtoInp.UserDtoInp;
import fpt.custome.yourlure.dto.dtoOut.UserAddressDtoOut;
import fpt.custome.yourlure.dto.dtoOut.UserResponseDTO;
import fpt.custome.yourlure.entity.Role;
import fpt.custome.yourlure.entity.User;
import fpt.custome.yourlure.entity.address.Country;
import fpt.custome.yourlure.entity.address.District;
import fpt.custome.yourlure.entity.address.Province;
import fpt.custome.yourlure.entity.address.Ward;
import fpt.custome.yourlure.service.OtpService;
import fpt.custome.yourlure.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserControllerImpl implements UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private OtpService otpService;


    @Override
    public ResponseEntity<Boolean> updateUser(HttpServletRequest req, UserDtoInp userDtoInp) {
        Boolean check = userService.updateUser(req, userDtoInp);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> addAddress(HttpServletRequest req, UserAddressInput userAddressInput) {
        Boolean check = userService.saveAddress(req, userAddressInput);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> updateAddress(HttpServletRequest req, UserAddressInput userAddressInput, Long userAddressId) {
        Boolean check = userService.updateAddress(req, userAddressInput, userAddressId);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> setDefaultAddress(HttpServletRequest req, Long userAddressId) {
        Boolean check = userService.setDefaultAddress(req, userAddressId);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> removeUserAddress(Long userAddressId) {
        Boolean delete = userService.removeUserAddress(userAddressId);
        return new ResponseEntity<>(delete, HttpStatus.OK);
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
    public ResponseEntity<List<District>> findDistrictById(Long id) {
        List<District> result = userService.findDistrictById(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Province>> getAllProvince() {
        List<Province> result = userService.findAllProvince();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Ward>> findWardById(Long id) {
        List<Ward> result = userService.findWardById(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<UserAddressDtoOut>> getAddressUser(HttpServletRequest req) {
        List<UserAddressDtoOut> result = userService.getAddressUser(req);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<UserAddressDtoOut>> getAddressUser(Long id) {
        List<UserAddressDtoOut> result = userService.adminGetAddressUser(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public Set<Role> getRoles(HttpServletRequest req) {
        return userService.getRoles(req);
    }

    @Override
    public UserResponseDTO whoami(HttpServletRequest req) {
        return modelMapper.map(userService.whoami(req), UserResponseDTO.class);
    }

    @Override
    public String refresh(HttpServletRequest req) {
        return userService.refresh(req.getRemoteUser());
    }


    @Override
    public String signup(@Valid UserDataDTO user) {
        return userService.signup(modelMapper.map(user, User.class));
    }

    @Override
    public String login(UserDataDTO user) {
        String phone = user.getPhone();
        String password = user.getPassword();
        return userService.signin(phone, password);
    }

    @Override
    public ResponseEntity<Object> forgotPwd(String phone) {
        if (userService.forgotPwd(phone)) {
            // success
            return new ResponseEntity<>("OTP successfully generated. Please check your phone!", HttpStatus.OK);
        }
        // failure message
        return new ResponseEntity<>("OTP can not be generated.", HttpStatus.BAD_REQUEST);

    }

    @Override
    public ResponseEntity<Object> resetPwd(String phone, String newPwd, Integer otp) {
        if (userService.resetPwd(phone, newPwd, otp)) {
            return new ResponseEntity<>("reset password successfully.", HttpStatus.OK);
        }
        return new ResponseEntity<>("fail to reset password!", HttpStatus.BAD_REQUEST);
    }

}
