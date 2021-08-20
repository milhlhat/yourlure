package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.OrderLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderLineRepos extends JpaRepository<OrderLine, Long> {

    List<OrderLine> findByOrder_OrderId(Long id);

    OrderLine findByProductId(Long id);

    OrderLine findByVariantId(Long id);

    List<OrderLine> findAllByCustomModelId(Long customizeId);
}
