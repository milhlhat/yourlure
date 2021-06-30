package fpt.custome.yourlure.controller.storefront.controllerImpl;

import fpt.custome.yourlure.controller.storefront.OrderController;
import fpt.custome.yourlure.dto.dtoInp.OrderDtoInput;
import fpt.custome.yourlure.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class OrderControllerImpl implements OrderController {

    @Autowired
    private OrderService orderService;


    @Override
    public Boolean processOrder(HttpServletRequest rq, OrderDtoInput order) {
        return orderService.processOrder(rq, order);
    }
}
