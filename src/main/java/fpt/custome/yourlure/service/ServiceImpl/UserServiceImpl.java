package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.UserDtoInp;
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
import fpt.custome.yourlure.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepos userRepos;

    @Autowired
    private OrderRepos orderRepos;

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

    @Override
    public String signin(String phone, String password) {
        try {
            User findUser = userRepos.findByPhone(phone);
            if (findUser.getEnabled()) {
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
            userRepos.save(user);
            return jwtTokenProvider.createToken(user.getPhone(), user.getRoles());
        } else {
            throw new CustomException("Username or phone is already in use", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    public Boolean block(Long id) {
        try {
            Optional<User> findUser = userRepos.findById(id);
            findUser.get().setEnabled(false);
            userRepos.save(findUser.get());
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }

    @Override
    public Optional<AdminUserDtoOut> adminFindAll(String keyword, String type, Pageable pageable) {
        List<AdminUserDtoOut.UserDtoOut> listResult = new ArrayList<>();
        try {
            Page<User> list = null;
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
                    AdminUserDtoOut.UserDtoOut dtoOut = mapper.map(item, AdminUserDtoOut.UserDtoOut.class);
                    // tat ca order cua khach hàng
                    dtoOut.setNumberOfOrder(orderRepos.findAllByUserUserId(item.getUserId()).size());
                    listResult.add(dtoOut);
                }
                AdminUserDtoOut results = AdminUserDtoOut.builder()
                        .userDtoOutList(listResult)
                        .totalUser((int) list.getTotalElements())
                        .totalPage(list.getTotalPages())
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
    public List<Role> getRoles(HttpServletRequest rq) {
        User user = userRepos.findByPhone(jwtTokenProvider.getUsername(jwtTokenProvider.resolveToken(rq)));
        if (user != null) {
            return user.getRoles();
        }
        return Collections.emptyList();
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
        List<UserAddressDtoOut> result = new ArrayList<>();
        User user = userRepos.findByPhone(jwtTokenProvider.getUsername(jwtTokenProvider.resolveToken(req)));
        List<UserAddress> list = (List<UserAddress>) user.getUserAddressCollection();
        // map collection user address to dto
        result = getAddressInUser(list);
        return result;
    }

    @Override
    public Boolean updateUser(HttpServletRequest req, UserDtoInp userDtoInp) {
        try {
            User userUpdate = userRepos.findByPhone(jwtTokenProvider.getUsername(jwtTokenProvider.resolveToken(req)));
            userUpdate.update(mapper.map(userDtoInp, User.class));
            userRepos.save(userUpdate);
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
            UserAddressDtoOut dtoOut = new UserAddressDtoOut();
            dtoOut.setUserWardName(userAddress.getWard().getUserWardName());
            dtoOut.setUserWardId(userAddress.getWard().getUserWardID());
            dtoOut.setUserDistrictName(userAddress.getWard().getUserDistrict().getUserDistrictName());
            dtoOut.setUserDistrictId(userAddress.getWard().getUserDistrict().getUserDistrictID());
            dtoOut.setUserProvinceName(userAddress.getWard().getUserDistrict().getUserProvince().getUserProvinceName());
            dtoOut.setUserProvinceId(userAddress.getWard().getUserDistrict().getUserProvince().getUserProvinceID());
            dtoOut.setDescription(userAddress.getDescription());
            result.add(dtoOut);
        }
        return result;
    }

}
