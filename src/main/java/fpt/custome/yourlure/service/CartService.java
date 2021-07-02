package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoInp.AddToCartDto;
import fpt.custome.yourlure.dto.dtoOut.CartDtoOut;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;


public interface CartService {

    /**
     * lấy giỏ hàng của user
     *
     * @param req user
     * @return
     */
    Optional<CartDtoOut> getCart(HttpServletRequest req);

    /**
     * Thêm sản phẩm vào giỏ hàng
     *
     * @param req
     * @param addToCartDto
     */
    Boolean addProduct(HttpServletRequest req, AddToCartDto addToCartDto);

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


}
