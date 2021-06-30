package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

public interface UserRepos extends JpaRepository<User, Long> {

    //    User findByUsername(String username);
    User findByPhone(String phone);

    Page<User> findByUsernameContainsIgnoreCase(String Keyword, Pageable pageable);

    Page<User> findByPhoneContainsIgnoreCase(String Keyword, Pageable pageable);

    Page<User> findByUserEmailContainsIgnoreCase(String Keyword, Pageable pageable);

    @Query(value = "SELECT\n" +
            "\ttbl_users.*\n" +
            "FROM\n" +
            "\ttbl_users\n" +
            "\tINNER JOIN\n" +
            "\ttbl_orders\n" +
            "\tON \n" +
            "\t\ttbl_users.user_id = tbl_orders.user_id \n" +
            "\t\tWHERE order_id = ?1 ", nativeQuery = true)
    Page<User> findByOrderId(Long Keyword, Pageable pageable);

    boolean existsByPhone(String phone);

    @Transactional
    void deleteByPhone(String username);
}
