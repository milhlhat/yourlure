package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

public interface CartItemRepos extends JpaRepository<CartItem, Long> {

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM tbl_cart_item WHERE cartid = ?1 ",
            nativeQuery = true)
    void deleteCartItemsByCart_CartID(Long cartID);

    @Transactional
    @Modifying
    @Query(value = "update tbl_cart_item set quantity = ?1 where cartId = ?2 and cart_item_id = ?3",
            nativeQuery = true)
    void updateQuantityCartItem(int quantity,
                                Long cartId,
                                Long cartItemId);
}
