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
import javax.validation.ValidationException;
import java.util.*;

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
        if (cart.isPresent()) {
            List<CartItem> items = (List<CartItem>) cart.get().getCartItemCollection();
            items.sort(new Comparator<CartItem>() {
                @Override
                public int compare(CartItem o1, CartItem o2) {
                    return o2.getCartItemId().compareTo(o1.getCartItemId());
                }

                @Override
                public boolean equals(Object obj) {
                    return false;
                }
            });
            return cart.map(this::cartToCartDto).orElse(null);
        }
        return new CartDtoOut();

    }

    @Override
    public CartDtoOut getListVariant(List<AddToCartDto> addToCartDtos) {

        List<CartItem> cartItems = new ArrayList<>();
        for (AddToCartDto cartItemInput : addToCartDtos) {
            CartItem cartItem = CartItem.builder()
                    .variantId(cartItemInput.getVariantId())
                    .quantity(cartItemInput.getQuantity())
                    .weight(cartItemInput.getWeight())
                    .build();
            cartItems.add(cartItem);
        }
        Cart cart = Cart.builder()
                .cartItemCollection(cartItems)
                .build();

        CartDtoOut result = cartToCartDto(cart);
        return result;
    }

    protected CustomizeModel getMyCustom(User user, Long customizeId) {
        for (CustomizeModel customizeModel : user.getCustomizeModels()) {
            if (customizeModel.getCustomizeId().equals(customizeId)) {
                return customizeModel;
            }
        }
        return null;
    }


    protected CartDtoOut cartToCartDto(Cart cart) {
        Collection<CartItem> items = cart.getCartItemCollection();
        if (items == null) {
            items = new ArrayList<>();
        }
        List<CartDtoOut.CartItemDtoOut> itemsDto = new ArrayList<>();
        for (CartItem item : items) {
            // map attribute to dto
            CartDtoOut.CartItemDtoOut itemDtoOut = mapper.map(item, CartDtoOut.CartItemDtoOut.class);

            // get custom model information
            if (item.getCustomModelId() != null) {
                Optional<CustomizeModel> customizeModelOptional = customizeRepos.findById(item.getCustomModelId());
                if (customizeModelOptional.isPresent()) {
                    CustomizeModel customizeModel = customizeModelOptional.get();
                    itemDtoOut.setCustomizeName(customizeModel.getName());
                    itemDtoOut.setThumbnailUrl(customizeModel.getThumbnailUrl());

                    //get product information
                    Model3d m3d = customizeModel.getModel3d();
                    Product product = m3d.getProduct();
                    if (orderService.validateWeightCustom(item.getWeight(), product.getMinWeight(), product.getMaxWeight())) {
                        throw new ValidationException("Vui lòng chọn đúng trọng lượng trong khoảng " + product.getMinWeight() + " đến " + product.getMaxWeight());
                    }
                    itemDtoOut.setProductName(product.getProductName());
                    itemDtoOut.setProductId(product.getProductId());
                    itemDtoOut.setPrice(product.getDefaultPrice() + orderService.calculateCustomizePrice(customizeModel));
                    itemDtoOut.setVisibleInStorefront(product.getVisibleInStorefront());
                }
            }

            // get variant information
            if (item.getVariantId() != null) {
                Optional<Variant> variantOptional = variantRepos.findById(item.getVariantId());
                if (variantOptional.isPresent()) {
                    Variant variant = variantOptional.get();
                    itemDtoOut.setVariantId(variant.getVariantId());
                    itemDtoOut.setVariantName(variant.getVariantName());
                    itemDtoOut.setVariantImg(variant.getImageUrl());
                    itemDtoOut.setProductId(variant.getProduct().getProductId());
                    itemDtoOut.setProductName(variant.getProduct().getProductName());
                    itemDtoOut.setPrice(variant.getNewPrice());
                    itemDtoOut.setVariantQuantity(variant.getQuantity());

                    Product product = variant.getProduct();
                    if (product.getIsCustomizeWeight() && orderService.validateWeightCustom(item.getWeight(), product.getMinWeight(), product.getMaxWeight())) {
                        throw new ValidationException("Vui lòng chọn đúng trọng lượng trong khoảng " + product.getMinWeight() + " đến " + product.getMaxWeight());
                    }
                    itemDtoOut.setVisibleInStorefront(product.getVisibleInStorefront());
                }
            }

            itemsDto.add(itemDtoOut);

        }

        return CartDtoOut.builder().cartItems(itemsDto).build();
    }

    protected Cart myCart(HttpServletRequest req) {
        User user = userService.whoami(req);
        Cart cart = cartRepos.findCartByUserUserId(user.getUserId()).orElse(null);
        if (cart == null) {
            cart = Cart.builder().user(user).build();
            cart = cartRepos.save(cart);
        }
        if (cart.getCartItemCollection() == null) {
            cart.setCartItemCollection(new ArrayList<>());
        }
        return cart;
    }

    @Override
    public Boolean addCustomizeItem(HttpServletRequest req, AddToCartDto addToCartDto) throws Exception {
        User user = userService.whoami(req);
        Cart cart = myCart(req);

        // check custom model is belong to current user or not. if not, this user can't add to cart

        CustomizeModel myCustom = getMyCustom(user, addToCartDto.getCustomModelId());
        if (myCustom == null) {
            throw new Exception("Tuỳ biến không tồn tại! vui lòng kiểm tra lại");
        }

        // if exist -> just increase quantity
        for (CartItem cartItem : cart.getCartItemCollection()) {
            if (cartItem.getCustomModelId() != null && cartItem.getCustomModelId().equals(myCustom.getCustomizeId()) && cartItem.getWeight().equals(addToCartDto.getWeight())) {
                int newQuantity = cartItem.getQuantity() + addToCartDto.getQuantity();
                if(newQuantity > 50){
                    throw new ValidationException("bạn chỉ được mua tối đa 50 sản phẩm!");
                }
                cartItem.setQuantity(newQuantity);
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
    public Boolean addVariantItem(HttpServletRequest req, AddToCartDto addToCartDto) {

        Cart cart = myCart(req);

        Optional<Variant> variant = variantRepos.findById(addToCartDto.getVariantId());
        if (variant.isPresent()) {

            // cart item exist
            for (CartItem cartItem : cart.getCartItemCollection()) {
                if (cartItem.getVariantId() != null && cartItem.getVariantId().equals(addToCartDto.getVariantId()) && cartItem.getWeight().equals(addToCartDto.getWeight())) {
                    int newQuantity = cartItem.getQuantity() + addToCartDto.getQuantity();

                    if(newQuantity > 50){
                        throw new ValidationException("bạn chỉ được mua tối đa 50 sản phẩm!");
                    }
                    if(newQuantity > variant.get().getQuantity()){
                        throw new ValidationException("trong kho chỉ còn " + variant.get().getQuantity() + " sản phẩm!");
                    }
                    cartItem.setQuantity(newQuantity);
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
            if (cartItem.getCartItemId().equals(cartItemId)) {
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
