package fpt.custome.yourlure.controller.storefront.controllerImpl;

import fpt.custome.yourlure.controller.storefront.CartController;
import fpt.custome.yourlure.dto.dtoInp.AddToCartDto;
import fpt.custome.yourlure.entity.Cart;
import fpt.custome.yourlure.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class CartControllerImpl implements CartController {

    @Autowired
    private CartService cartService;

    @Override
    public ResponseEntity<Object> getCart(HttpServletRequest req) {
        Optional<Cart> result = cartService.getCart(req);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Object> addItem(HttpServletRequest req,
                                          AddToCartDto addToCartDto) {
        try{
            Cart result = cartService.addItem(req, addToCartDto);
            return new ResponseEntity<>(result, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<Object> removeItem(HttpServletRequest req, Long cartItemId) {
        Cart cart = cartService.removeItem(req, cartItemId);
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Object> setItemQuantity(HttpServletRequest req,
                                                   Long itemId,
                                                   int quantity) {
        Boolean result = cartService.setItemQuantity(req, itemId, quantity);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


}
