package fpt.custome.yourlure.controller.storefront.controllerImpl;

import fpt.custome.yourlure.controller.storefront.OrderController;
import fpt.custome.yourlure.dto.dtoInp.OrderGuestDtoInput;
import fpt.custome.yourlure.dto.dtoInp.OrderUserDtoInput;
import fpt.custome.yourlure.dto.dtoOut.DiscountVoucherDtoOutput;
import fpt.custome.yourlure.dto.dtoOut.StoreUserOrderDtoOut;
import fpt.custome.yourlure.service.OrderService;
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
public class OrderControllerImpl implements OrderController {

    @Autowired
    private OrderService orderService;


    @Override
    public ResponseEntity<Object> verifyDiscount(String code) {
        try{
            DiscountVoucherDtoOutput result = orderService.verifyDiscountCode(code);
            if (result == null){
                return new ResponseEntity<>("Mã code không tồn tại", HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<Object> guestProcessOrder(OrderGuestDtoInput order) {
        try {
            return new ResponseEntity<>(orderService.guestProcessOrder(order), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<Object> userProcessOrder(HttpServletRequest rq, OrderUserDtoInput order) {
        try{
            return new ResponseEntity<>(orderService.userProcessOrder(rq, order), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<Optional<StoreUserOrderDtoOut>> getListUserOrder(HttpServletRequest req,
                                                                           Integer page,
                                                                           Integer limit) {
        Optional<StoreUserOrderDtoOut> result = orderService.getListUserOrder(req,page,limit);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
