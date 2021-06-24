package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepos extends JpaRepository<Order, Long> {
}
