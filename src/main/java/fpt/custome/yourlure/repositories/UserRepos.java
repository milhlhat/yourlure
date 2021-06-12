package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

public interface UserRepos extends JpaRepository<User, Long> {

    User findByUsername(String username);
    User findByUserEmail(String email);

    boolean existsByUsername(String username);

    @Transactional
    void deleteByUsername(String username);
}
