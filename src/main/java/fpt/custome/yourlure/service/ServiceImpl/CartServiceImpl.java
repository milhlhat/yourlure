package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.AddToCartDto;
import fpt.custome.yourlure.dto.dtoOut.CartDtoOut;
import fpt.custome.yourlure.entity.Cart;
import fpt.custome.yourlure.entity.CartItem;
import fpt.custome.yourlure.entity.User;
import fpt.custome.yourlure.repositories.*;
import fpt.custome.yourlure.service.CartService;
import fpt.custome.yourlure.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepos cartRepos;

    @Autowired
    private UserRepos userRepos;

    @Autowired
    private ProductJpaRepos productJpaRepos;

    @Autowired
    private CartItemRepos cartItemRepos;

    @Autowired
    private CustomizeRepos customizeRepos;

    @Autowired
    private UserService userService;

    @Autowired
    private ModelMapper mapper;

    @Override
    public Optional<CartDtoOut> getCart(HttpServletRequest req) {

        User user = userService.whoami(req);
        Optional<Cart> cart = cartRepos.findCartByUserUserId(user.getUserId());
        if (cart.isPresent()) {
            CartDtoOut cartDtoOut = mapper.map(cart.get(), CartDtoOut.class);
            return Optional.of(cartDtoOut);
        }
        return Optional.empty();

    }

    @Override
    public Cart addProduct(HttpServletRequest req, AddToCartDto addToCartDto) {
        try {
            User user = userService.whoami(req);
            Cart cart = cartRepos.findCartByUserUserId(user.getUserId()).orElse(Cart.builder().user(user).build());

            CartItem cartItem = mapper.map(addToCartDto, CartItem.class);
            cartItem.setCart(cart);
            cart.getCartItemCollection().add(cartItem);
            cart = cartRepos.save(cart);
            return cart;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public Boolean removeProduct(Long cartId, Long cartItemId) {
        cartItemRepos.deleteCartItemsByCart_CartId(cartId);
        return true;
    }

    @Override
    public Boolean setProductQuantity(Long cartId, Long cartItemId, int quantity) {
        try {
            cartItemRepos.updateQuantityCartItem(quantity, cartId, cartItemId);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

}
