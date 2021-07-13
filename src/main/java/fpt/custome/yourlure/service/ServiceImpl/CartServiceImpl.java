package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.AddToCartDto;
import fpt.custome.yourlure.dto.dtoOut.CartDtoOut;
import fpt.custome.yourlure.entity.*;
import fpt.custome.yourlure.entity.customizemodel.CustomizeModel;
import fpt.custome.yourlure.entity.customizemodel.Model3d;
import fpt.custome.yourlure.repositories.*;
import fpt.custome.yourlure.service.CartService;
import fpt.custome.yourlure.service.OrderService;
import fpt.custome.yourlure.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
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
    private VariantRepos variantRepos;

    @Autowired
    private CartItemRepos cartItemRepos;

    @Autowired
    private CustomizeRepos customizeRepos;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private ModelMapper mapper;

    @Override
    public CartDtoOut getCart(HttpServletRequest req) {

        User user = userService.whoami(req);
        Optional<Cart> cart = cartRepos.findCartByUserUserId(user.getUserId());
        return cart.map(this::cartToCartDto).orElse(null);

    }

    protected CustomizeModel getMyCustom(User user, Long customizeId){
        for (CustomizeModel customizeModel : user.getCustomizeModels()) {
            if (customizeModel.getCustomizeId().equals(customizeId)) {
                return customizeModel;
            }
        }
        return null;
    }

    protected CartDtoOut cartToCartDto(Cart cart){
        Collection<CartItem> items = cart.getCartItemCollection();
        if(items == null){
            items = new ArrayList<>();
        }
        List<CartDtoOut.CartItemDtoOut> itemsDto = new ArrayList<>();
        for (CartItem item : items){
            // map attribute to dto
            CartDtoOut.CartItemDtoOut itemDtoOut = mapper.map(item, CartDtoOut.CartItemDtoOut.class);

            // get custom model information
            if(item.getCustomModelId() != null){
                CustomizeModel customizeModel = customizeRepos.getById(item.getCustomModelId());
                itemDtoOut.setCustomizeName(customizeModel.getName());
                itemDtoOut.setThumbnailUrl(customizeModel.getThumbnailUrl());

                Model3d m3d = customizeModel.getModel3d();
                Product product = m3d.getProduct();
                itemDtoOut.setProductName(product.getProductName());
                itemDtoOut.setProductId(product.getProductId());
                itemDtoOut.setPrice(product.getDefaultPrice() + orderService.calculateCustomizePrice(customizeModel));
            }

            // get variant information
            if(item.getVariantId() != null){
                Variant variant = variantRepos.getById(item.getVariantId());
                itemDtoOut.setVariantId(variant.getVariantId());
                itemDtoOut.setVariantName(variant.getVariantName());
                itemDtoOut.setProductId(variant.getProduct().getProductId());
                itemDtoOut.setProductName(variant.getProduct().getProductName());
                itemDtoOut.setPrice(variant.getNewPrice());
            }


            itemsDto.add(itemDtoOut);

        }

        return CartDtoOut.builder().cartItems(itemsDto).build();
    }

    @Override
    public Boolean addCustomizeItem(HttpServletRequest req, AddToCartDto addToCartDto) throws Exception {
        User user = userService.whoami(req);

        // check custom model is belong to current user or not. if not, this user can't add to cart

        CustomizeModel myCustom = getMyCustom(user, addToCartDto.getCustomModelId());
        if(myCustom == null){
            throw new Exception("this custom model isn't yours!");
        }
        Cart cart = cartRepos.findCartByUserUserId(user.getUserId()).orElse(Cart.builder().user(user).build());
        Collection<CartItem> cartItems = cart.getCartItemCollection();
        if(cartItems == null){
            cartItems = new ArrayList<>();
        }

        // if exist -> just increase quantity
        for (CartItem cartItem : cartItems) {
            if(cartItem.getCustomModelId() != null && cartItem.getCustomModelId().equals(myCustom.getCustomizeId()) && cartItem.getWeight().equals(addToCartDto.getWeight())){
                cartItem.setQuantity(cartItem.getQuantity() + addToCartDto.getQuantity());
                cartItemRepos.save(cartItem);
                return true;
            }
        }
        CartItem item = CartItem.builder()
                .cart(cart)
                .customModelId(myCustom.getCustomizeId())
                .quantity(addToCartDto.getQuantity())
                .weight(addToCartDto.getWeight())
                .build();
        cartItemRepos.save(item);

        return true;

    }

    @Override
    public Boolean addVariantItem(HttpServletRequest req, AddToCartDto addToCartDto) throws Exception {
        User user = userService.whoami(req);
        Optional<Variant> variant = variantRepos.findById(addToCartDto.getVariantId());
        if(variant.isPresent()){
            Cart cart = cartRepos.findCartByUserUserId(user.getUserId()).orElse(Cart.builder().user(user).build());
            Collection<CartItem> cartItems = cart.getCartItemCollection();
            if(cartItems == null){
                cartItems = new ArrayList<>();
            }
            // cart item exist
            for (CartItem cartItem : cartItems) {
                if(cartItem.getVariantId() != null && cartItem.getVariantId().equals(addToCartDto.getVariantId()) && cartItem.getWeight().equals(addToCartDto.getWeight())){
                    cartItem.setQuantity(cartItem.getQuantity() + addToCartDto.getQuantity());
                    cartItemRepos.save(cartItem);
                    return true;
                }
            }

            // new product added
            CartItem item = CartItem.builder()
                    .cart(cart)
                    .variantId(addToCartDto.getVariantId())
                    .quantity(addToCartDto.getQuantity())
                    .weight(addToCartDto.getWeight())
                    .build();
            cartItemRepos.save(item);
            return true;
        }
        return false;
    }

    @Override
    public Boolean removeItem(HttpServletRequest req, Long cartItemId) {
        User user = userService.whoami(req);
        Cart cart = cartRepos.findCartByUserUserId(user.getUserId()).orElse(Cart.builder().user(user).build());
        if (cart.getCartItemCollection() == null) {
            return false;
        }
        for (CartItem cartItem : cart.getCartItemCollection()) {
            if(cartItem.getCartItemId().equals(cartItemId)){
                cartItemRepos.delete(cartItem);
                return true;
            }
        }

        return false;
    }

    @Override
    public Boolean setItemQuantity(HttpServletRequest rq, Long cartItemId, int quantity) {
        try {
            User user = userService.whoami(rq);
            Cart cart = cartRepos.findCartByUserUserId(user.getUserId()).orElse(Cart.builder().user(user).build());
            CartItem item = cart.getCartItemCollection().stream().filter(cartItem -> cartItem.getCartItemId().equals(cartItemId)).findFirst().orElse(null);
            if (item != null) {
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
