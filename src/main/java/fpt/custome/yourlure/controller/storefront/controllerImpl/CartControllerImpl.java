package fpt.custome.yourlure.controller.storefront.controllerImpl;

import fpt.custome.yourlure.controller.storefront.CartController;
import fpt.custome.yourlure.dto.dtoInp.OrderDtoInput;
import fpt.custome.yourlure.dto.dtoOut.CartDtoOut;
import fpt.custome.yourlure.entity.CartItem;
import fpt.custome.yourlure.entity.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class CartControllerImpl implements CartController {

    @Override
    public ResponseEntity<Optional<CartDtoOut>> getCart(Long id) {
        return null;
    }

    @Override
    public void addProduct(Long id, CartItem cartItem) {

    }

    @Override
    public void removeProduct(Long cartId, String productId) {

    }

    @Override
    public void setProductQuantity(Long id, String productId, int quantity) {

    }

    @Override
    public OrderDtoInput createOrder(Long id, Order order) {
        return null;
    }
}
