package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.UserAddressInput;
import fpt.custome.yourlure.dto.dtoInp.UserDtoInp;
import fpt.custome.yourlure.dto.dtoOut.AdminStaffDtoOut;
import fpt.custome.yourlure.dto.dtoOut.AdminUserDetailDtoOut;
import fpt.custome.yourlure.dto.dtoOut.AdminUserDtoOut;
import fpt.custome.yourlure.dto.dtoOut.UserAddressDtoOut;
import fpt.custome.yourlure.entity.Provider;
import fpt.custome.yourlure.entity.Role;
import fpt.custome.yourlure.entity.User;
import fpt.custome.yourlure.entity.UserAddress;
import fpt.custome.yourlure.entity.address.Country;
import fpt.custome.yourlure.entity.address.District;
import fpt.custome.yourlure.entity.address.Province;
import fpt.custome.yourlure.entity.address.Ward;
import fpt.custome.yourlure.repositories.*;
import fpt.custome.yourlure.security.JwtTokenProvider;
import fpt.custome.yourlure.security.exception.CustomException;
import fpt.custome.yourlure.service.OtpService;
import fpt.custome.yourlure.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepos userRepos;

    @Autowired
    private OrderRepos orderRepos;

    @Autowired
    private UserAddressRepos userAddressRepos;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserCountryRepos userCountryRepos;

    @Autowired
    private UserProvinceRepos userProvinceRepos;

    @Autowired
    private UserDistrictRepos userDistrictRepos;

    @Autowired
    private UserWardRepos userWardRepos;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private OtpService otpService;

    protected String verifyPhone(String phone){
        phone = phone.replace("+84", "0");
        if(phone.startsWith("84")){
            phone = "0" + phone.substring(2);
        }
        return phone;
    }

    @Override
    public String signin(String phone, String password) {
        try {
            User findUser = userRepos.findByPhone(phone);
            if (findUser.getEnabled()) {
                phone = verifyPhone(phone);
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(phone, password));
                return jwtTokenProvider.createToken(phone, userRepos.findByPhone(phone).getRoles());
            }
            throw new CustomException("This account was disabled", HttpStatus.UNPROCESSABLE_ENTITY);
        } catch (AuthenticationException e) {
            throw new CustomException("Invalid username/password supplied", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }


    public String signup(User user) {
        if (!userRepos.existsByPhone(user.getPhone())) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setProvider(Provider.LOCAL);
            user.setEnabled(true);
            user.setMaxCustomizable(5);
            user.setRoles(Collections.singleton(Role.ROLE_CUSTOMER));
            userRepos.save(user);
            return jwtTokenProvider.createToken(user.getPhone(), user.getRoles());
        } else {
            throw new CustomException("Username or phone is already in use", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @Override
    public Boolean changePwd(HttpServletRequest rq, String oldPwd, String newPwd) {
        try {
            User user = whoami(rq);
            Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getPhone(), oldPwd));

            if(authenticate.isAuthenticated()){
                user.setPassword(passwordEncoder.encode(newPwd));
                userRepos.save(user);
                return true;
            }

        }catch (Exception e){
            e.printStackTrace();
        }
        return false;

    }

    @Override
    public Boolean forgotPwd(String phone) {
        if (phone == null) {
            return false;
        }
        phone = verifyPhone(phone);
        User user = userRepos.findByPhone(phone);
        if (user != null) {
            return otpService.generateOtp(phone);
        }
        return false;
    }

    @Override
    public Boolean resetPwd(String phone, String newPwd, Integer otp) {
        phone = verifyPhone(phone);
        Boolean isValid = otpService.validateOTP(phone, otp);
        if (isValid) {
            User user = userRepos.findByPhone(phone);
            user.setPassword(passwordEncoder.encode(newPwd));
            userRepos.save(user);
        }

        return isValid;
    }

    public Boolean switchStatus(Long id) {
        try {
            Optional<User> findUser = userRepos.findById(id);
           if (!findUser.get().getRoles().contains(Role.ROLE_ADMIN)){
               findUser.get().setEnabled(!findUser.get().getEnabled());
               userRepos.save(findUser.get());
               return true;
           }
           return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }

    @Override
    public Optional<AdminUserDtoOut> adminFindAll(String keyword, String type, Pageable pageable) {
        List<AdminUserDtoOut.UserDtoOut> listResult = new ArrayList<>();
        try {
            Page<User> list;
            switch (type.trim()) {
                case "name": {
                    list = userRepos.findByUsernameContainsIgnoreCase(keyword, pageable);
                    break;
                }
                case "phone": {
                    list = userRepos.findByPhoneContainsIgnoreCase(keyword, pageable);
                    break;
                }
                case "email": {
                    list = userRepos.findByUserEmailContainsIgnoreCase(keyword, pageable);
                    break;
                }
                case "orderId": {
                    list = userRepos.findByOrderId(Long.parseLong(keyword), pageable);
                    break;
                }
                default: {
                    list = userRepos.findAll(pageable);
                    break;
                }
            }
            if (list.getContent().isEmpty()) {
                throw new CustomException("Doesn't exist", HttpStatus.NOT_FOUND);
            } else {
                for (User item : list.getContent()) {
                    if (item.getRoles().contains(Role.ROLE_CUSTOMER)) {
                        AdminUserDtoOut.UserDtoOut dtoOut = mapper.map(item, AdminUserDtoOut.UserDtoOut.class);
                        // tat ca order cua khach hàng
                        dtoOut.setNumberOfOrder(orderRepos.findAllByUserUserId(item.getUserId()).size());
                        listResult.add(dtoOut);
                    }
                }
                AdminUserDtoOut results = AdminUserDtoOut.builder()
                        .userDtoOutList(listResult)
                        .totalUser(listResult.size())
                        .totalPage((int) Math.ceil(listResult.size() / pageable.getPageSize()))
                        .build();
                return Optional.of(results);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }

    @Override
    public Optional<AdminStaffDtoOut> adminStaffAll(String keyword, String type, Pageable pageable) {
        List<AdminStaffDtoOut.StaffDtoOut> listResult = new ArrayList<>();
        try {
            Page<User> list;
            switch (type.trim()) {
                case "name": {
                    list = userRepos.findByUsernameContainsIgnoreCase(keyword, pageable);
                    break;
                }
                case "phone": {
                    list = userRepos.findByPhoneContainsIgnoreCase(keyword, pageable);
                    break;
                }
                case "email": {
                    list = userRepos.findByUserEmailContainsIgnoreCase(keyword, pageable);
                    break;
                }
                default: {
                    list = userRepos.findAll(pageable);
                    break;
                }
            }
            if (list.getContent().isEmpty()) {
                throw new CustomException("Doesn't exist", HttpStatus.NOT_FOUND);
            } else {
                for (User item : list.getContent()) {
                    if (!item.getRoles().contains(Role.ROLE_CUSTOMER)) {
                        AdminStaffDtoOut.StaffDtoOut dtoOut = mapper.map(item, AdminStaffDtoOut.StaffDtoOut.class);
                        listResult.add(dtoOut);
                    }
                }
                AdminStaffDtoOut results = AdminStaffDtoOut.builder()
                        .userDtoOutList(listResult)
                        .totalUser(listResult.size())
                        .totalPage((int) Math.ceil(listResult.size() / pageable.getPageSize()))
                        .build();
                return Optional.of(results);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }

    public User whoami(HttpServletRequest req) {
        return userRepos.findByPhone(jwtTokenProvider.getUsername(jwtTokenProvider.resolveToken(req)));
    }

    public String refresh(String phone) {
        return jwtTokenProvider.createToken(phone, userRepos.findByPhone(phone).getRoles());
    }


    @Override
    public Optional<AdminUserDetailDtoOut> getUser(Long id) {
        try {
            Optional<User> userOptional = userRepos.findById(id);
            User user = userOptional.get();
            AdminUserDetailDtoOut result = mapper.map(user, AdminUserDetailDtoOut.class);
            return Optional.of(result);
        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }

    @Override
    public Set<Role> getRoles(HttpServletRequest rq) {
        User user = userRepos.findByPhone(jwtTokenProvider.getUsername(jwtTokenProvider.resolveToken(rq)));
        if (user != null) {
            return user.getRoles();
        }
        return Collections.emptySet();
    }

    @Override
    public List<UserAddressDtoOut> adminGetAddressUser(Long id) {
        Optional<User> user = userRepos.findById(id);
        List<UserAddress> list = (List<UserAddress>) user.get().getUserAddressCollection();
        // map collection user address to dto
        List<UserAddressDtoOut> result = getAddressInUser(list);
        return result;
    }

    @Override
    public List<UserAddressDtoOut> getAddressUser(HttpServletRequest req) {
        List<UserAddressDtoOut> result;
        User user = userRepos.findByPhone(jwtTokenProvider.getUsername(jwtTokenProvider.resolveToken(req)));
        List<UserAddress> list = (List<UserAddress>) user.getUserAddressCollection();
        // map collection user address to dto
        List<UserAddress> userAddressList = userAddressRepos.findAllByUser_UserIdOrderByUserAddressId(user.getUserId());

        result = getAddressInUser(userAddressList);
        return result;
    }

    @Override
    public Boolean updateUser(HttpServletRequest req, UserDtoInp userDtoInp) {
        try {
            User userUpdate = userRepos.findByPhone(jwtTokenProvider.getUsername(jwtTokenProvider.resolveToken(req)));
            userUpdate.setUsername(userDtoInp.getUsername());
            userUpdate.setUserEmail(userDtoInp.getUserEmail());
            userUpdate.setGender(userDtoInp.getGender());
            userRepos.save(userUpdate);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean saveAddress(HttpServletRequest req, UserAddressInput userAddressInput) {
        try {
            User user = userRepos.findByPhone(jwtTokenProvider.getUsername(jwtTokenProvider.resolveToken(req)));
            UserAddress userAddress = mapper.map(userAddressInput, UserAddress.class);
            userAddress.setUser(user);
            if (user.getUserAddressCollection().isEmpty()) {
                userAddress.setIsDefault(true);
            }
            userAddressRepos.save(userAddress);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean updateAddress(HttpServletRequest req, UserAddressInput userAddressInput, Long userAddressId) {
        try {
            User user = userRepos.findByPhone(jwtTokenProvider.getUsername(jwtTokenProvider.resolveToken(req)));
            UserAddress userAddress = userAddressRepos.getById(userAddressId);
            UserAddress userAddressUpdate = mapper.map(userAddressInput, UserAddress.class);
            userAddressUpdate.setUserAddressId(userAddressId);
            userAddressUpdate.setUser(user);
            userAddressUpdate.setIsDefault(userAddress.getIsDefault());
            userAddressRepos.save(userAddressUpdate);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean setDefaultAddress(HttpServletRequest req, Long userAddressId) {
        try {
            User user = userRepos.findByPhone(jwtTokenProvider.getUsername(jwtTokenProvider.resolveToken(req)));
            for (UserAddress userAddress : user.getUserAddressCollection()) {
                if (userAddress.getUserAddressId().equals(userAddressId))
                    userAddress.setIsDefault(true);
                else userAddress.setIsDefault(false);
            }
            userRepos.save(user);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean removeUserAddress(Long userAddressId) {
        try {
            userAddressRepos.deleteById(userAddressId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    @Override
    public List<Country> findAllCountry() {
        List<Country> result = userCountryRepos.findAll();
        return result;
    }

    @Override
    public List<Province> findAllProvince() {
        List<Province> result = userProvinceRepos.findAll(Sort.by(Sort.Direction.ASC, "userProvinceName"));
        return result;
    }

    @Override
    public Optional<Province> findProvinceById(Long id) {
        Optional<Province> result = userProvinceRepos.findById(id);
        return result;
    }

    @Override
    public List<District> findDistrictById(Long id) {
        List<District> result = userDistrictRepos.findDistrictByUserProvinceUserProvinceID(id);
        return result;
    }

    @Override
    public List<Ward> findWardById(Long id) {
        List<Ward> result = userWardRepos.findByUserDistrictUserDistrictID(id);
        return result;
    }

    public List<UserAddressDtoOut> getAddressInUser(List<UserAddress> list) {
        List<UserAddressDtoOut> result = new ArrayList<>();
        for (UserAddress userAddress : list) {
            Ward ward = userWardRepos.getById(userAddress.getUserWardId());
            UserAddressDtoOut dtoOut = mapper.map(userAddress, UserAddressDtoOut.class);
            dtoOut.setUserWardName(ward.getUserWardName());
            dtoOut.setUserWardId(ward.getUserWardID());
            dtoOut.setUserDistrictName(ward.getUserDistrict().getUserDistrictName());
            dtoOut.setUserDistrictId(ward.getUserDistrict().getUserDistrictID());
            dtoOut.setUserProvinceName(ward.getUserDistrict().getUserProvince().getUserProvinceName());
            dtoOut.setUserProvinceId(ward.getUserDistrict().getUserProvince().getUserProvinceID());
            dtoOut.setDescription(userAddress.getDescription());
            result.add(dtoOut);
        }
        return result;
    }

}
