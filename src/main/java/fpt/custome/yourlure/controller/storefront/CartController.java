package fpt.custome.yourlure.controller.storefront;

import fpt.custome.yourlure.dto.dtoInp.AddToCartDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;


@RequestMapping(path = "/cart")
public interface CartController {

    /**
     * @param req
     * @return
     */
    @GetMapping("/my-cart")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    ResponseEntity<Object> getCart(HttpServletRequest req);

    /**
     * trả về danh sách thông tin variant của guest
     *
     * @param addToCartDtos
     * @return
     */
    @PostMapping("/list-variant-of-guest")
    ResponseEntity<Object> getListVariant(@RequestBody List<AddToCartDto> addToCartDtos);

    /**
     * @param req
     * @param addToCartDto
     * @return
     */
    @PostMapping("/add-customize")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    ResponseEntity<Object> addCustomize(HttpServletRequest req,
                                        @RequestBody @Valid AddToCartDto addToCartDto);

    @PostMapping("/add-variant")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    ResponseEntity<Object> addVariant(HttpServletRequest req,
                                      @RequestBody @Valid AddToCartDto addToCartDto);

    /**
     * @param req
     * @param cartItemId
     * @return
     */
    @DeleteMapping("remove-item")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    ResponseEntity<Object> removeItem(HttpServletRequest req, Long cartItemId);

    /**
     * @param req
     * @param itemId
     * @param quantity
     * @return
     */
    @PostMapping("save-quantity")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    ResponseEntity<Object> setItemQuantity(HttpServletRequest req,
                                           @RequestParam Long itemId,
                                           @RequestParam int quantity);

}
