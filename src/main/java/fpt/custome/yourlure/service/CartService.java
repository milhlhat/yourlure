package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoInp.CartItemInput;
import fpt.custome.yourlure.dto.dtoInp.OrderDtoInput;
import fpt.custome.yourlure.dto.dtoOut.CartDtoOut;
import fpt.custome.yourlure.entity.Order;

import java.util.Optional;


public interface CartService {

    /**
     * lấy giỏ hàng của user
     *
     * @param userId user
     * @return
     */
    Optional<CartDtoOut> getCart(Long userId);

    /**
     * Thêm sản phẩm vào giỏ hàng
     *
     * @param cartId
     * @param cartItemInput
     */
    Boolean addProduct(Long userId,Long cartId, CartItemInput cartItemInput);

    /**
     * xoá SP khỏi giỏ hàng
     *
     * @param cartId
     * @param cartItemId
     */
    Boolean removeProduct(Long cartId, Long cartItemId);

    /**
     * thay đổi quantity của product
     *
     * @param cartId
     * @param cartItemId
     * @param quantity
     */
    Boolean setProductQuantity(Long cartId, Long cartItemId, int quantity);

    /**
     * user thực hiện order
     *
     * @param userId user
     * @param order
     * @return
     */
    Optional<OrderDtoInput> createOrder(Long userId, Order order);


}
