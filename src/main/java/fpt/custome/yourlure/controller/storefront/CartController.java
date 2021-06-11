package fpt.custome.yourlure.controller.storefront;

import fpt.custome.yourlure.dto.dtoInp.CartItemInput;
import fpt.custome.yourlure.dto.dtoInp.OrderDtoInput;
import fpt.custome.yourlure.dto.dtoOut.CartDtoOut;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RequestMapping(path = "/cart")
public interface CartController {

    /**
     * lấy giỏ hàng của user
     *
     * @param id user
     * @return
     */
    @GetMapping("/{id}")
    ResponseEntity<Optional<CartDtoOut>> getCart(@PathVariable Long id);

    /**
     * Thêm sản phẩm vào giỏ hàng
     *
     * @param cartId        user
     * @param cartItemInput
     */
    @PostMapping("/add-product")
    ResponseEntity<Boolean> addProduct(@RequestParam("userId") Long userId,
                                       @RequestParam("cartId") Long cartId,
                                       @RequestBody CartItemInput cartItemInput);

    /**
     * xoá SP khỏi giỏ hàng
     *
     * @param cartId
     * @param productId
     */
    @DeleteMapping("remove/{cartId}")
    ResponseEntity<Boolean> removeProduct(@PathVariable("cartId") Long cartId, Long productId);

    /**
     * thay đổi quantity của product
     *
     * @param cartId    user
     * @param productId
     * @param quantity
     */
    @PostMapping("save-quantity/{cartId}")
    ResponseEntity<Boolean> setProductQuantity(@PathVariable("cartId") Long cartId,
                                               @RequestParam Long productId,
                                               @RequestParam int quantity);

    /**
     * user thực hiện order
     *
     * @param cartId user
     * @param orderDtoInput
     * @return
     */
    @PostMapping("order/{cartId}")
    ResponseEntity<Optional<OrderDtoInput>> createOrder(@PathVariable("cartId") Long cartId,
                                                        @RequestBody OrderDtoInput orderDtoInput);
}
