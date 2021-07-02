package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface CartItemRepos extends JpaRepository<CartItem, Long> {

    List<CartItem> findAllByCartItemIdIn(List<Long> ids);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM tbl_cart_item WHERE cart_id = ?1 ",
            nativeQuery = true)

    void deleteCartItemsByCart_CartId(Long cartId);

    @Transactional
    @Modifying
    @Query(value = "update tbl_cart_item set quantity = ?1 where cart_id = ?2 and cart_item_id = ?3",
            nativeQuery = true)
    void updateQuantityCartItem(int quantity,
                                Long cartId,
                                Long cartItemId);
}
