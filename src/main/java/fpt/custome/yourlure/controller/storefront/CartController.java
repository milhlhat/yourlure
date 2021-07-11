package fpt.custome.yourlure.controller.storefront;

import fpt.custome.yourlure.dto.dtoInp.AddToCartDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;


@RequestMapping(path = "/cart")
public interface CartController {

    /**
     *
     * @param req
     * @return
     */
    @GetMapping("/my-cart")
    ResponseEntity<Object> getCart(HttpServletRequest req);

    /**
     *
     * @param req
     * @param addToCartDto
     * @return
     */
    @PostMapping("/add-product")
    ResponseEntity<Object> addItem(@RequestParam("req") HttpServletRequest req,
                                   @RequestBody @Valid AddToCartDto addToCartDto);

    /**
     *
     * @param req
     * @param cartItemId
     * @return
     */
    @DeleteMapping("remove-item")
    ResponseEntity<Object> removeItem(@RequestParam("req") HttpServletRequest req, Long cartItemId);

    /**
     *
     * @param req
     * @param itemId
     * @param quantity
     * @return
     */
    @PostMapping("save-quantity")
    ResponseEntity<Object> setItemQuantity(@RequestParam("req") HttpServletRequest req,
                                           @RequestParam Long itemId,
                                           @RequestParam int quantity);

}
