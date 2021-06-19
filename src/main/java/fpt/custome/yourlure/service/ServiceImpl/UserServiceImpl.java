package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.UserAddressInput;
import fpt.custome.yourlure.dto.dtoInp.UserDtoInp;
import fpt.custome.yourlure.dto.dtoOut.UserAddressDtoOut;
import fpt.custome.yourlure.dto.dtoOut.UserDtoOut;
import fpt.custome.yourlure.dto.dtoOut.UserResponseDTO;
import fpt.custome.yourlure.entity.Provider;
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
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepos userRepos;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserAddressRepos userAddressRepos;

    @Autowired
    private UserCountryRepos userCountryRepos;

    @Autowired
    private UserProvinceRepos userProvinceRepos;

    @Autowired
    private UserDistrictRepos userDistrictRepos;

    @Autowired
    private UserWardRepos userWardRepos;


    // Tạo mapper object
//    ModelMapper mapper = new ModelMapper();

    @Autowired
    private ModelMapper mapper;
    @Override
    public String signin(String phone, String password) {
        try {
            User findUser = userRepos.findByPhone(phone);
            if(findUser.getEnabled()){
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(phone, password));
                return jwtTokenProvider.createToken(phone, userRepos.findByPhone(phone).getRoles());
            }
            throw new CustomException("This account was disabled", HttpStatus.UNPROCESSABLE_ENTITY);
        } catch (AuthenticationException e) {
            throw new CustomException("Invalid username/password supplied", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }


    public String signup (User user){
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

        public void delete (String phone){
            User findUser = userRepos.findByPhone(phone);
            findUser.setEnabled(false);
            userRepos.save(findUser);
//            userRepos.deleteByPhone(phone);
        }

        public User search (String phone){
            User user = userRepos.findByPhone(phone);
            if (user == null) {
                throw new CustomException("The user doesn't exist", HttpStatus.NOT_FOUND);
            }
            return user;
        }

    @Override
    public List<UserResponseDTO> findAll() {
        List<User> users = userRepos.findAll();
        List<UserResponseDTO> result = new ArrayList<>();
        for(User user: users){
            result.add(mapper.map(user, UserResponseDTO.class));

        }
        return result;
    }

    public User whoami (HttpServletRequest req){
            return userRepos.findByPhone(jwtTokenProvider.getUsername(jwtTokenProvider.resolveToken(req)));
        }

        public String refresh (String phone){
            return jwtTokenProvider.createToken(phone, userRepos.findByPhone(phone).getRoles());
        }


        @Override
        public Optional<UserDtoOut> getUser (Long id){

            Optional<User> user = userRepos.findById(id);
            if (user.isPresent()) {
                UserDtoOut result = mapper.map(user.get(), UserDtoOut.class);
                return Optional.of(result);
            }
            return Optional.empty();
        }

        @Override
        public List<UserAddressDtoOut> getAddressUser (Long id){
            List<UserAddressDtoOut> result = new ArrayList<>();
            List<UserAddress> list = userAddressRepos.findAllByUser_UserId(id);
            for (UserAddress userAddress : list) {
                UserAddressDtoOut dtoOut = new UserAddressDtoOut();
                dtoOut.setUserWardName(userAddress.getWard().getUserWardName());
                dtoOut.setUserDistrictName(userAddress.getWard().getUserDistrict().getUserDistrictName());
                dtoOut.setUserProvinceName(userAddress.getWard().getUserDistrict().getUserProvince().getUserProvinceName());
                dtoOut.setUserCountryName(userAddress.getWard().getUserDistrict().getUserProvince().getUserCountry()
                        .getUserCountryName());
                dtoOut.setDescription(userAddress.getDescription());
                result.add(dtoOut);
            }
            return result;
        }

        @Override
        public Boolean updateUser (Long id, UserDtoInp userDtoInp){

            try {
                if (id != null && userDtoInp != null) {
                    if (userRepos.findById(id).isPresent()) {
                        User userUpdate = mapper.map(userDtoInp, User.class);
                        userRepos.deleteById(id);
                        userRepos.save(userUpdate);
                    } else {
                        return false;
                    }
                }
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            return true;
        }

        @Override
        public Boolean updateAddress (Long id, UserAddressInput userAddressInput){

            try {
                if (id != null && userAddressInput != null) {
                    if (userAddressRepos.findById(id).isPresent()) {
                        UserAddress userAddressUpdate = mapper.map(userAddressInput, UserAddress.class);
                        userAddressUpdate.setUserAddressId(id);
                        userAddressRepos.save(userAddressUpdate);
                    } else {
                        return false;
                    }
                }
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            return true;
        }

        @Override
        public List<Country> findAllCountry () {
            List<Country> result = userCountryRepos.findAll();
            return result;
        }

        @Override
        public Optional<Province> findProvinceById (Long id){
            Optional<Province> result = userProvinceRepos.findById(id);
            return result;
        }

        @Override
        public Optional<District> findDistrictById (Long id){
            Optional<District> result = userDistrictRepos.findById(id);
            return result;
        }

        @Override
        public Optional<Ward> findWardById (Long id){
            Optional<Ward> result = userWardRepos.findById(id);
            return result;
        }

    }
