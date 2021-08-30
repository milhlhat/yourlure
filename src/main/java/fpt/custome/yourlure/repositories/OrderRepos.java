package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepos extends JpaRepository<Order, Long> {

    List<Order> findAllByUserUserId(Long id);

    @Query(value = "select ord.* from tbl_orders ord\n" +
            " where Concat(upper(unaccent(ord.receiver_name)),\n" +
            "upper(unaccent(ord.order_code))) like upper(unaccent(?1))",nativeQuery = true)
    Page<Order> findAllOrder(String keyword, Pageable pageable);

    Page<Order> findAllByPhoneContainsIgnoreCase(String keyword, Pageable pageable);

    Page<Order> findAllByUserUserId(Long id, Pageable pageable);

}
