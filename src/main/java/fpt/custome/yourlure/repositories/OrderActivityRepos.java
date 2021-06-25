package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.OrderActivity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderActivityRepos extends JpaRepository<OrderActivity, Long> {

    OrderActivity findByOrder_OrderId(Long id);
}
