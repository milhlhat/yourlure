package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoInp.UserDtoInp;
import fpt.custome.yourlure.dto.dtoOut.AdminUserDtoOut;
import fpt.custome.yourlure.dto.dtoOut.UserAddressDtoOut;
import fpt.custome.yourlure.dto.dtoOut.UserResponseDTO;
import fpt.custome.yourlure.entity.Role;
import fpt.custome.yourlure.entity.User;
import fpt.custome.yourlure.entity.address.Country;
import fpt.custome.yourlure.entity.address.District;
import fpt.custome.yourlure.entity.address.Province;
import fpt.custome.yourlure.entity.address.Ward;
import org.springframework.data.domain.Pageable;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

public interface UserService {

    //store front -------------------------------------------
    String signin(String phone, String password);

    String signup(User user);

    User whoami(HttpServletRequest req);

    String refresh(String phone);

    List<UserAddressDtoOut> getAddressUser(HttpServletRequest req);

    Boolean updateUser(HttpServletRequest req, UserDtoInp userDtoInp);

//    Boolean updateAddress(HttpServletRequest req, UserAddressInput userAddressInput);

    //common service -------------------------------------------
    List<Country> findAllCountry();

    Optional<Province> findProvinceById(Long id);

    Optional<District> findDistrictById(Long id);

    Optional<Ward> findWardById(Long id);

    //admin front -------------------------------------------

    void delete(String phone);

    User search(String phone);

    List<AdminUserDtoOut> adminFindAll(Pageable pageable);

    Optional<UserResponseDTO> getUser(Long id);

    List<Role> getRoles(HttpServletRequest rq);


}
