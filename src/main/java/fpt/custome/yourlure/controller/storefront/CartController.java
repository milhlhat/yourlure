package fpt.custome.yourlure.controller.storefront;

import fpt.custome.yourlure.dto.dtoInp.OrderDtoInput;
import fpt.custome.yourlure.dto.dtoOut.CartDtoOut;
import fpt.custome.yourlure.entity.CartItem;
import fpt.custome.yourlure.entity.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RequestMapping(path = "/cart")
public interface CartController {

    /**
     * lấy giỏ hàng của user
     * @param id user
     * @return
     */
    @GetMapping("/{id}")
    ResponseEntity<Optional<CartDtoOut>> getCart(@PathVariable Long id);

    /**
     * Thêm sản phẩm vào giỏ hàng
     * @param id user
     * @param cartItem
     */
    @PostMapping("/add-product")
    public void addProduct(@PathVariable("id") Long id,@RequestBody CartItem cartItem);

    /**
     * xoá SP khỏi giỏ hàng
     * @param cartId
     * @param productId
     */
    @DeleteMapping("remove/{id}")
    public void removeProduct(@PathVariable("id") Long cartId, String productId);

    /**
     * thay đổi quantity của product
     * @param id user
     * @param productId
     * @param quantity
     */
    @PostMapping("save-quantity/{id}")
    public void setProductQuantity(@PathVariable("id") Long id,@RequestParam String productId,@RequestParam int quantity);

    /**
     * user thực hiện order
     * @param id user
     * @param order
     * @return
     */
    @PostMapping("order/{id}")
    public OrderDtoInput createOrder(@PathVariable("id") Long id, @RequestBody Order order);
}
