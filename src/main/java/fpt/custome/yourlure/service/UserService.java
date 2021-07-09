package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoInp.UserAddressInput;
import fpt.custome.yourlure.dto.dtoInp.UserDtoInp;
import fpt.custome.yourlure.dto.dtoOut.AdminStaffDtoOut;
import fpt.custome.yourlure.dto.dtoOut.AdminUserDetailDtoOut;
import fpt.custome.yourlure.dto.dtoOut.AdminUserDtoOut;
import fpt.custome.yourlure.dto.dtoOut.UserAddressDtoOut;
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
import java.util.Set;

public interface UserService {

    //store front -------------------------------------------
    String signin(String phone, String password);

    String signup(User user);

    Boolean changePwd(HttpServletRequest rq, String oldPwd, String newPwd);

    Boolean forgotPwd(String phone);

    Boolean resetPwd(String phone, String newPwd, Integer otp);

    User whoami(HttpServletRequest req);

    String refresh(String phone);

    List<UserAddressDtoOut> getAddressUser(HttpServletRequest req);

    Boolean updateUser(HttpServletRequest req, UserDtoInp userDtoInp);

    Boolean saveAddress(HttpServletRequest req, UserAddressInput userAddressInput);

    Boolean updateAddress(HttpServletRequest req, UserAddressInput userAddressInput, Long userAddressId);

    Boolean setDefaultAddress(HttpServletRequest req, Long userAddressId);

    Boolean removeUserAddress( Long userAddressId);

    //common service -------------------------------------------
    List<Country> findAllCountry();

    List<Province> findAllProvince();

    Optional<Province> findProvinceById(Long id);

    List<District> findDistrictById(Long id);

    List<Ward> findWardById(Long id);

    //admin front -------------------------------------------

    Boolean block(Long id);

    Optional<AdminUserDtoOut> adminFindAll(String keyword, String type, Pageable pageable);

    Optional<AdminStaffDtoOut> adminStaffAll(String keyword, String type, Pageable pageable);

    Optional<AdminUserDetailDtoOut> getUser(Long id);

    Set<Role> getRoles(HttpServletRequest rq);

    List<UserAddressDtoOut> adminGetAddressUser(Long id);
}
