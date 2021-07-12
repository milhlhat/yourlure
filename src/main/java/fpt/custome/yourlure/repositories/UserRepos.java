package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

public interface UserRepos extends JpaRepository<User, Long> {

    User findByPhone(String phone);

    @Query(value = " SELECT tbl_users.* \n" +
            "from tbl_users,user_roles,tbl_orders\n" +
            "WHERE tbl_users.user_id = user_roles.user_user_id\n" +
            "and user_roles.roles = 2\n " +
            "and concat(lower(unaccent(tbl_users.username)),\n " +
            "lower(unaccent(tbl_users.phone)),tbl_orders.order_id)\n " +
            " like lower(unaccent(?1)) " , nativeQuery = true)
    Page<User> findAllUser(String keyword,Pageable pageable);

    @Query(value = "SELECT * \n" +
            "from tbl_users,user_roles\n" +
            "WHERE tbl_users.user_id = user_roles.user_user_id\n" +
            "and user_roles.roles in (1,0) " +
            "and concat(lower(unaccent(tbl_users.username))," +
            "lower(unaccent(tbl_users.phone))) like lower(unaccent(?1))", nativeQuery = true)
    Page<User> findAllStaff(String keyword,Pageable pageable);

    boolean existsByPhone(String phone);

    @Transactional
    void deleteByPhone(String username);
}
