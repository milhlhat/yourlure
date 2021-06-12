package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoInp.UserAddressInput;
import fpt.custome.yourlure.dto.dtoInp.UserDtoInp;
import fpt.custome.yourlure.dto.dtoOut.UserAddressDtoOut;
import fpt.custome.yourlure.dto.dtoOut.UserDtoOut;
import fpt.custome.yourlure.entity.address.Country;
import fpt.custome.yourlure.entity.address.District;
import fpt.custome.yourlure.entity.address.Province;
import fpt.custome.yourlure.entity.address.Ward;

import java.util.List;
import java.util.Optional;

public interface UserService {
    void processOAuthPostLogin(String username);

    Optional<UserDtoOut> getUser(Long id);

    List<UserAddressDtoOut> getAddressUser(Long id);

    Boolean updateUser(Long id, UserDtoInp userDtoInp);

    Boolean updateAddress(Long id, UserAddressInput userAddressInput);

    List<Country> findAllCountry();

    Optional<Province> findProvinceById(Long id);

    Optional<District> findDistrictById(Long id);

    Optional<Ward> findWardById(Long id);


}
