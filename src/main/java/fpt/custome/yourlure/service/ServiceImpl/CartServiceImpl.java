package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.AddToCartDto;
import fpt.custome.yourlure.entity.Cart;
import fpt.custome.yourlure.entity.CartItem;
import fpt.custome.yourlure.entity.User;
import fpt.custome.yourlure.entity.customizemodel.CustomizeModel;
import fpt.custome.yourlure.repositories.*;
import fpt.custome.yourlure.service.CartService;
import fpt.custome.yourlure.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
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
    public Optional<Cart> getCart(HttpServletRequest req) {

        User user = userService.whoami(req);
        return cartRepos.findCartByUserUserId(user.getUserId());

    }

    @Override
    public Cart addItem(HttpServletRequest req, AddToCartDto addToCartDto) throws Exception {
        User user = userService.whoami(req);
        // check custom model is belong to current user or not
        for (CustomizeModel customizeModel : user.getCustomizeModels()) {
            if(customizeModel.getCustomizeId().equals(addToCartDto.getCustomModelId())){
                Cart cart = cartRepos.findCartByUserUserId(user.getUserId()).orElse(Cart.builder().user(user).build());

                CartItem cartItem = mapper.map(addToCartDto, CartItem.class);
                cartItem.setCart(cart);
                cartItem = cartItemRepos.save(cartItem);

                if(cart.getCartItemCollection() != null){
                    cart.getCartItemCollection().add(cartItem);
                }else{
                    cart.setCartItemCollection(Collections.singletonList(cartItem));
                }
                return cart;
            }
        }
        throw new Exception("this model doesn't belong to you");
    }

    @Override
    public Cart removeItem(HttpServletRequest req, Long cartItemId) {
        User user = userService.whoami(req);
        Cart cart = cartRepos.findCartByUserUserId(user.getUserId()).orElse(Cart.builder().user(user).build());
        if(cart.getCartItemCollection() == null){
            return cart;
        }
        cart.getCartItemCollection().removeIf(cartItem -> cartItem.getCartItemId().equals(cartItemId));
        cart = cartRepos.save(cart);
        return cart;
    }

    @Override
    public Boolean setItemQuantity(HttpServletRequest rq, Long cartItemId, int quantity) {
        try {
            User user = userService.whoami(rq);
            Cart cart = cartRepos.findCartByUserUserId(user.getUserId()).orElse(Cart.builder().user(user).build());
            CartItem item = cart.getCartItemCollection().stream().filter(cartItem -> cartItem.getCartItemId().equals(cartItemId)).findFirst().orElse(null);
            if(item != null){
                item.setQuantity(quantity);
                item = cartItemRepos.save(item);
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return false;
    }

}
