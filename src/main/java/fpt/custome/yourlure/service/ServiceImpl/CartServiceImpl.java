package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.CartItemInput;
import fpt.custome.yourlure.dto.dtoInp.OrderDtoInput;
import fpt.custome.yourlure.dto.dtoOut.CartDtoOut;
import fpt.custome.yourlure.entity.Cart;
import fpt.custome.yourlure.entity.Order;
import fpt.custome.yourlure.repositories.CartItemRepos;
import fpt.custome.yourlure.repositories.CartRepos;
import fpt.custome.yourlure.service.CartService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepos cartRepos;

    @Autowired
    private CartItemRepos cartItemRepos;

    // Tạo mapper object
    ModelMapper mapper = new ModelMapper();

    @Override
    public Optional<CartDtoOut> getCart(Long userId) {
        //TODO: validate
        Optional<Cart> cart = cartRepos.findCartByUserUserId(userId);
        if (cart.isPresent()) {
            CartDtoOut cartDtoOut = mapper.map(cart.get(), CartDtoOut.class);
            return Optional.of(cartDtoOut);
        }
        return Optional.empty();
    }

    @Override
    public Boolean addProduct(Long userId, Long cartId, CartItemInput cartItemInput) {

        //TODO: add vao bang customize voi userid
        //TODO: add vao bang cart item voi carid
        return null;
    }

    @Override
    public Boolean removeProduct(Long cartId, Long cartItemId) {
        //TODO: cần check thêm dk xoá là variant
        cartItemRepos.deleteCartItemsByCart_CartId(cartId);
        return true;
    }

    @Override
    public Boolean setProductQuantity(Long cartId, Long cartItemId, int quantity) {
        //TODO: cần check thêm dk xoá là variant
        cartItemRepos.updateQuantityCartItem( quantity, cartId, cartItemId);
        return true;
    }

    @Override
    public Optional<OrderDtoInput> createOrder(Long userId, Order order) {
        return Optional.empty();
    }
}
