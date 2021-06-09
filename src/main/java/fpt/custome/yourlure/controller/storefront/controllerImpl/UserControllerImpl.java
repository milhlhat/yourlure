package fpt.custome.yourlure.controller.storefront.controllerImpl;

import fpt.custome.yourlure.controller.storefront.UserController;
import fpt.custome.yourlure.dto.dtoInp.UserDtoInp;
import fpt.custome.yourlure.dto.dtoOut.UserDtoOut;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class UserControllerImpl implements UserController {

    @Override
    public ResponseEntity<Optional<UserDtoOut>> getUser(Long id) {
        return null;
    }

    @Override
    public ResponseEntity<Boolean> updateUser(Long id, UserDtoInp userDtoInp) {
        return null;
    }

    @Override
    public ResponseEntity<Boolean> saveCate(UserDtoInp userDtoInp) {
        return null;
    }
}
