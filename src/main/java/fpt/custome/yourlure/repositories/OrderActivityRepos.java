package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.OrderActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderActivityRepos extends JpaRepository<OrderActivity, Long> {

    @Query(value = "SELECT * from tbl_order_activities\n" +
            "WHERE order_id = ?1\n" +
            "ORDER BY \"date\" DESC", nativeQuery = true)
    List<OrderActivity> findAllByOrderId(Long id);

    OrderActivity findByOrder_OrderId(Long id);

}
