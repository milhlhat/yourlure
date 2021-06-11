package fpt.custome.yourlure.controller.storefront.controllerImpl;

import fpt.custome.yourlure.controller.storefront.UserController;
import fpt.custome.yourlure.dto.dtoInp.UserDtoInp;
import fpt.custome.yourlure.dto.dtoOut.UserDtoOut;
import fpt.custome.yourlure.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

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

}
