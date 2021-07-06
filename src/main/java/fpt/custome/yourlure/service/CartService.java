package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoInp.AddToCartDto;
import fpt.custome.yourlure.entity.Cart;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;


public interface CartService {

    /**
     * lấy giỏ hàng của user
     *
     * @param req user
     * @return
     */
    Optional<Cart> getCart(HttpServletRequest req);

    /**
     * Thêm sản phẩm vào giỏ hàng
     *
     * @param req
     * @param addToCartDto
     */
    Cart addItem(HttpServletRequest req, AddToCartDto addToCartDto) throws Exception;

    /**
     * xoá SP khỏi giỏ hàng
     *
     * @param cartItemId
     */
    Cart removeItem(HttpServletRequest req,Long cartItemId);

    /**
     * thay đổi quantity của product
     *
     * @param cartItemId
     * @param quantity
     */
    Boolean setItemQuantity(HttpServletRequest rq, Long cartItemId, int quantity);


}
