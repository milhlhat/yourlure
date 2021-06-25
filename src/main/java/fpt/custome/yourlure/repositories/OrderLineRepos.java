package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.OrderLine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderLineRepos extends JpaRepository<OrderLine, Long> {

    List<OrderLine> findByOrder_OrderId(Long id);
}
