package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.OrderLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderLineRepos extends JpaRepository<OrderLine, Long> {

    List<OrderLine> findByOrder_OrderId(Long id);

    @Query(value = "select order_line_id\n" +
            "from tbl_order_line \n" +
            "where product_id = ?1\n" +
            "LIMIT 1", nativeQuery = true)
    OrderLine findByProductId(Long id);

    List<OrderLine> findAllByCustomModelId(Long customizeId);
}
