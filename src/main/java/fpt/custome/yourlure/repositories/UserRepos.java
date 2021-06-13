package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

public interface UserRepos extends JpaRepository<User, Long> {

//    User findByUsername(String username);
    User findByPhone(String phone);


    boolean existsByPhone(String phone);

    @Transactional
    void deleteByPhone(String username);
}
