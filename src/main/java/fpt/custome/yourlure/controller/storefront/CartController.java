package fpt.custome.yourlure.controller.storefront;

import fpt.custome.yourlure.dto.dtoInp.CartItemInput;
import fpt.custome.yourlure.dto.dtoInp.OrderGuestDtoInput;
import fpt.custome.yourlure.dto.dtoOut.CartDtoOut;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;


@RequestMapping(path = "/cart")
public interface CartController {

    /**
     * lấy giỏ hàng của user
     *
     * @param req user
     * @return
     */
    @GetMapping("/{id}")
    ResponseEntity<Optional<CartDtoOut>> getCart(@RequestParam("req") HttpServletRequest req);

    /**
     * Thêm sản phẩm vào giỏ hàng
     *
     * @param req
     * @param cartItemInput
     * @return
     */
    @PostMapping("/add-product")
    ResponseEntity<Boolean> addProduct(@RequestParam("req") HttpServletRequest req,
                                       @RequestBody CartItemInput cartItemInput);

    /**
     * xoá SP khỏi giỏ hàng
     *
     * @param cartId
     * @param productId
     */
    @DeleteMapping("remove/{cartId}")
    ResponseEntity<Boolean> removeProduct(@RequestParam("req") HttpServletRequest req,
                                          @PathVariable("cartId") Long cartId,
                                          Long productId);

    /**
     * thay đổi quantity của product
     *
     * @param cartId    user
     * @param productId
     * @param quantity
     */
    @PostMapping("save-quantity/{cartId}")
    ResponseEntity<Boolean> setProductQuantity(@RequestParam("req") HttpServletRequest req,
                                               @PathVariable("cartId") Long cartId,
                                               @RequestParam Long productId,
                                               @RequestParam int quantity);

    /**
     * user thực hiện order
     *
     * @param cartId        user
     * @param orderGuestDtoInput
     * @return
     */
    @PostMapping("order/{cartId}")
    ResponseEntity<Optional<OrderGuestDtoInput>> createOrder(@PathVariable("cartId") Long cartId,
                                                             @RequestBody OrderGuestDtoInput orderGuestDtoInput);
}
