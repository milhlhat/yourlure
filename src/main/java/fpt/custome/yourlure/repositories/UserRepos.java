package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

public interface UserRepos extends JpaRepository<User, Long> {

    //    User findByUsername(String username);
    User findByPhone(String phone);

    Page<User> findByUsernameContainsIgnoreCase(String Keyword, Pageable pageable);

    Page<User> findByPhoneContainsIgnoreCase(String Keyword, Pageable pageable);

    Page<User> findByUserEmailContainsIgnoreCase(String Keyword, Pageable pageable);


    boolean existsByPhone(String phone);

    @Transactional
    void deleteByPhone(String username);
}
