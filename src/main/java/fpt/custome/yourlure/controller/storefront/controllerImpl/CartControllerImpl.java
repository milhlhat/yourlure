package fpt.custome.yourlure.controller.storefront.controllerImpl;

import fpt.custome.yourlure.controller.storefront.CartController;
import fpt.custome.yourlure.dto.dtoInp.CartItemInput;
import fpt.custome.yourlure.dto.dtoInp.OrderDtoInput;
import fpt.custome.yourlure.dto.dtoOut.CartDtoOut;
import fpt.custome.yourlure.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class CartControllerImpl implements CartController {

    @Autowired
    private CartService cartService;

    @Override
    public ResponseEntity<Optional<CartDtoOut>> getCart(Long id) {
        Optional<CartDtoOut> result = cartService.getCart(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> addProduct(Long userId,
                                              Long cartId,
                                              CartItemInput cartItemInput) {
        Boolean result = cartService.addProduct(userId, cartId, cartItemInput);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> removeProduct(Long userId,
                                                 Long cartId,
                                                 Long productId) {
        Boolean result = cartService.removeProduct(cartId, productId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> setProductQuantity(Long userId,
                                                      Long cartId,
                                                      Long productId,
                                                      int quantity) {
        Boolean result = cartService.setProductQuantity(cartId, productId, quantity);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Optional<OrderDtoInput>> createOrder(Long cartId,
                                                               OrderDtoInput orderDtoInput) {
        return null;
    }
}
