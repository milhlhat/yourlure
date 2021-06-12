package fpt.custome.yourlure.service.CategoryServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.UserAddressInput;
import fpt.custome.yourlure.dto.dtoInp.UserDtoInp;
import fpt.custome.yourlure.dto.dtoOut.UserAddressDtoOut;
import fpt.custome.yourlure.dto.dtoOut.UserDtoOut;
import fpt.custome.yourlure.entity.User;
import fpt.custome.yourlure.entity.UserAddress;
import fpt.custome.yourlure.entity.address.Country;
import fpt.custome.yourlure.entity.address.District;
import fpt.custome.yourlure.entity.address.Province;
import fpt.custome.yourlure.entity.address.Ward;
import fpt.custome.yourlure.repositories.*;
import fpt.custome.yourlure.security.Provider;
import fpt.custome.yourlure.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepos userRepos;

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
    ModelMapper mapper = new ModelMapper();

    public void processOAuthPostLogin(String username) {
//		System.out.println("da login thah cong");
        User existUser = userRepos.findAllByUsername(username);

        if (existUser == null) {
            User newUser = new User();
            newUser.setUsername(username);
            newUser.setProvider(Provider.GOOGLE);
//            newUser.setUserRole(false);

            userRepos.save(newUser);

            System.out.println("Created new user: " + username);
        }

    }

    @Override
    public Optional<UserDtoOut> getUser(Long id) {

        Optional<User> user = userRepos.findById(id);
        if (user.isPresent()) {
            UserDtoOut result = mapper.map(user.get(), UserDtoOut.class);
            return Optional.of(result);
        }
        return Optional.empty();
    }

    @Override
    public List<UserAddressDtoOut> getAddressUser(Long id) {
        List<UserAddressDtoOut> result = new ArrayList<>();
        List<UserAddress> list = userAddressRepos.findAllByUser_UserID(id);
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
    public Boolean updateUser(Long id, UserDtoInp userDtoInp) {

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
    public Boolean updateAddress(Long id, UserAddressInput userAddressInput) {

        try {
            if (id != null && userAddressInput != null) {
                if (userAddressRepos.findById(id).isPresent()) {
                    UserAddress userAddressUpdate = mapper.map(userAddressInput, UserAddress.class);
                    userAddressUpdate.setUserAddressID(id);
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
    public List<Country> findAllCountry() {
        List<Country> result = userCountryRepos.findAll();
        return result;
    }

    @Override
    public Optional<Province> findProvinceById(Long id) {
        Optional<Province> result = userProvinceRepos.findById(id);
        return result;
    }

    @Override
    public Optional<District> findDistrictById(Long id) {
        Optional<District> result = userDistrictRepos.findById(id);
        return result;
    }

    @Override
    public Optional<Ward> findWardById(Long id) {
        Optional<Ward> result = userWardRepos.findById(id);
        return result;
    }

}
