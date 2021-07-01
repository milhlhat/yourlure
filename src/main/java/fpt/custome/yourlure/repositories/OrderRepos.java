package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepos extends JpaRepository<Order, Long> {

    List<Order> findAllByUserUserId(Long id);

    Page<Order> findAllByReceiverNameContainsIgnoreCase(String keyword, Pageable pageable);

    Page<Order> findAllByPhoneContainsIgnoreCase(String keyword, Pageable pageable);

    Page<Order> findAllByUserUserId(Long id, Pageable pageable);
}
