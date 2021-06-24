package fpt.custome.yourlure.controller.storefront.controllerImpl;

import fpt.custome.yourlure.controller.storefront.UserController;
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
import fpt.custome.yourlure.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserControllerImpl implements UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ResponseEntity<UserResponseDTO> getUser(Long id) {
        Optional<UserResponseDTO> userDtoOut = userService.getUser(id);
        return new ResponseEntity<>(userDtoOut.orElse(null), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> updateUser(HttpServletRequest req, UserDtoInp userDtoInp) {
        Boolean check = userService.updateUser(req, userDtoInp);
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
    public ResponseEntity<List<UserAddressDtoOut>> getAddressUser(HttpServletRequest req) {
        List<UserAddressDtoOut> result = userService.getAddressUser(req);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public List<UserResponseDTO> findAll() {
        return userService.findAll();
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
    public UserResponseDTO search(String phone) {
        return modelMapper.map(userService.search(phone), UserResponseDTO.class);
    }

    @Override
    public String signup(UserDataDTO user) {
        user.setRoles(Collections.singletonList(Role.ROLE_CUSTOMER));
        return userService.signup(modelMapper.map(user, User.class));
    }

    @Override
    public String login(Map<String, String> user) {
        String phone = user.get("phone");
        String password = user.get("password");
        return userService.signin(phone, password);
    }

}
