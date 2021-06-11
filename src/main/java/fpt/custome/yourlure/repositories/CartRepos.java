package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepos extends JpaRepository<Cart, Long> {

    Optional<Cart> findCartByUserUserID(Long aLong);

}
