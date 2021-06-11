package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoInp.UserDtoInp;
import fpt.custome.yourlure.dto.dtoOut.UserDtoOut;

import java.util.Optional;

public interface UserService {
    void processOAuthPostLogin(String username);

    Optional<UserDtoOut> getUser(Long id);

    Boolean updateUser(Long id, UserDtoInp userDtoInp);

}
