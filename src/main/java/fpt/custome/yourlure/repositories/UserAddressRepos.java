package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.UserAddress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserAddressRepos extends JpaRepository<UserAddress, Long> {

    List<UserAddress> findAllByUser_UserId(Long id);

    List<UserAddress> findAllByUser_UserIdOrderByUserAddressId(Long id);
}
