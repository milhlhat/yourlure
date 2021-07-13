package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoInp.AddToCartDto;
import fpt.custome.yourlure.dto.dtoOut.CartDtoOut;

import javax.servlet.http.HttpServletRequest;


public interface CartService {

    /**
     * lấy giỏ hàng của user
     *
     * @param req user
     * @return
     */
    CartDtoOut getCart(HttpServletRequest req);

    /**
     * Thêm sản phẩm vào giỏ hàng
     *
     * @param req
     * @param addToCartDto
     */
    Boolean addCustomizeItem(HttpServletRequest req, AddToCartDto addToCartDto) throws Exception;

    Boolean addVariantItem(HttpServletRequest req, AddToCartDto addToCartDto) throws Exception;

    /**
     * xoá SP khỏi giỏ hàng
     *
     * @param cartItemId
     */
    Boolean removeItem(HttpServletRequest req, Long cartItemId);

    /**
     * thay đổi quantity của product
     *
     * @param cartItemId
     * @param quantity
     */
    Boolean setItemQuantity(HttpServletRequest rq, Long cartItemId, int quantity);


}
