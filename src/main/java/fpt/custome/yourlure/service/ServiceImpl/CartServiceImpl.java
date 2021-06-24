package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.CartItemInput;
import fpt.custome.yourlure.dto.dtoInp.CustomizeDtoInput;
import fpt.custome.yourlure.dto.dtoOut.CartDtoOut;
import fpt.custome.yourlure.entity.*;
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
    ModelMapper mapper;

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
    public Boolean addProduct(HttpServletRequest req, CartItemInput cartItemInput) {
        try {
            User user = userService.whoami(req);
            Optional<Cart> cartOptional = cartRepos.findCartByUserUserId(user.getUserId());
            Cart cart = cartOptional.get();
            if (cart == null) {
                Cart cartInput = Cart.builder()
                        .user(user)
                        .build();
                cart = cartRepos.save(cartInput);
            }
            // add vao bang customize voi userid
            if (cartItemInput.getCustomizeDtoInput() != null) {
                CustomizeDtoInput customizeDtoInput = cartItemInput.getCustomizeDtoInput();
                Customize customizeInput = mapper.map(customizeDtoInput, Customize.class);
                customizeInput.setUser(user);
                Optional<Product> productInput = productJpaRepos.findById(cartItemInput.getProductId());
                customizeInput.setProduct(productInput.get());
                customizeRepos.save(customizeInput);
            }
            // add vao bang cart item voi carid
            cartItemInput.setCartId(cart.getCartId());
            CartItem cartItem = mapper.map(cartItemInput, CartItem.class);
            cartItem.setCart(cart);
            cartItemRepos.save(cartItem);
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
