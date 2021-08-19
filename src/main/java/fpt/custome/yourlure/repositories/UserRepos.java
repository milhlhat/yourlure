package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

public interface UserRepos extends JpaRepository<User, Long> {

    User findByPhone(String phone);

    @Query(value = " SELECT u.*, COUNT(o.order_id) AS number_of_order \n" +
            "from tbl_users u\n" +
            "LEFT JOIN user_roles ur on u.user_id = ur.user_user_id\n" +
            "LEFT JOIN tbl_orders o on u.user_id = o.user_id\n " +
            "where \n " +
            "ur.roles = 2\n " +
            "and concat(lower(unaccent(u.username)),\n " +
            "lower(unaccent(u.phone)),o.order_id)\n " +
            "like lower(unaccent(?1))\n" +
            "GROUP BY u.user_id", nativeQuery = true)
    Page<User> findAllUser(String keyword, Pageable pageable);

    @Query(value = " SELECT u.*, COUNT(o.order_id) AS number_of_order \n" +
            "from tbl_users u\n" +
            "LEFT JOIN user_roles ur on u.user_id = ur.user_user_id\n" +
            "LEFT JOIN tbl_orders o on u.user_id = o.user_id\n " +
            "where \n " +
            "ur.roles in (1,0)\n " +
            "and concat(lower(unaccent(u.username)),\n " +
            "lower(unaccent(u.phone)),o.order_id)\n " +
            "like lower(unaccent(?1))\n" +
            "GROUP BY u.user_id", nativeQuery = true)
    Page<User> findAllStaff(String keyword, Pageable pageable);

    boolean existsByPhone(String phone);

    @Transactional
    void deleteByPhone(String username);
}
