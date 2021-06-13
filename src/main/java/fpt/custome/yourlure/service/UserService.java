package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoInp.UserAddressInput;
import fpt.custome.yourlure.dto.dtoInp.UserDtoInp;
import fpt.custome.yourlure.dto.dtoOut.UserAddressDtoOut;
import fpt.custome.yourlure.dto.dtoOut.UserDtoOut;
import fpt.custome.yourlure.dto.dtoOut.UserResponseDTO;
import fpt.custome.yourlure.entity.User;
import fpt.custome.yourlure.entity.address.Country;
import fpt.custome.yourlure.entity.address.District;
import fpt.custome.yourlure.entity.address.Province;
import fpt.custome.yourlure.entity.address.Ward;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

public interface UserService {
    String signin(String phone, String password);

    String signup(User user);

    void delete(String phone);

    User search(String phone);

    List<UserResponseDTO> findAll();

    User whoami(HttpServletRequest req);

    String refresh(String phone);

    Optional<UserDtoOut> getUser(Long id);

    List<UserAddressDtoOut> getAddressUser(Long id);

    Boolean updateUser(Long id, UserDtoInp userDtoInp);

    Boolean updateAddress(Long id, UserAddressInput userAddressInput);

    List<Country> findAllCountry();

    Optional<Province> findProvinceById(Long id);

    Optional<District> findDistrictById(Long id);

    Optional<Ward> findWardById(Long id);


}
