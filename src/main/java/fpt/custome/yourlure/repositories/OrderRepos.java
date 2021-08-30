package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepos extends JpaRepository<Order, Long> {

    List<Order> findAllByUserUserId(Long id);

    @Query(value = "select * from tbl_orders\n" +
            "where Concat(upper(unaccent(tbl_orders.receiver_name)),\n" +
            "upper(unaccent(tbl_orders.order_code))) like upper(unaccent(?1))",nativeQuery = true)
    Page<Order> findAllOrder(String keyword, Pageable pageable);

    Page<Order> findAllByPhoneContainsIgnoreCase(String keyword, Pageable pageable);

    Page<Order> findAllByUserUserId(Long id, Pageable pageable);

}
