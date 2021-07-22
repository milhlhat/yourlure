package fpt.custome.yourlure.controller.storefront.controllerImpl;

import fpt.custome.yourlure.controller.storefront.CartController;
import fpt.custome.yourlure.dto.dtoInp.AddToCartDto;
import fpt.custome.yourlure.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class CartControllerImpl implements CartController {

    @Autowired
    private CartService cartService;

    @Override
    public ResponseEntity<Object> getCart(HttpServletRequest req) {
        return new ResponseEntity<>(cartService.getCart(req), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Object> getListVariant(List<AddToCartDto> addToCartDtos) {
        return new ResponseEntity<>(cartService.getListVariant(addToCartDtos), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Object> addItem(HttpServletRequest req,
                                          AddToCartDto addToCartDto) {
        try{
            return new ResponseEntity<>(cartService.addCustomizeItem(req, addToCartDto), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<Object> addVariant(HttpServletRequest req, AddToCartDto addToCartDto) {
        try{
            return new ResponseEntity<>(cartService.addVariantItem(req, addToCartDto), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<Object> removeItem(HttpServletRequest req, Long cartItemId) {
        return new ResponseEntity<>(cartService.removeItem(req, cartItemId), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Object> setItemQuantity(HttpServletRequest req,
                                                   Long itemId,
                                                   int quantity) {
        Boolean result = cartService.setItemQuantity(req, itemId, quantity);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


}
