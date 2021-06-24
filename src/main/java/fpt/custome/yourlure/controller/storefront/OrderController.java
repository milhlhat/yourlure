package fpt.custome.yourlure.controller.storefront;

import fpt.custome.yourlure.dto.dtoInp.OrderDtoInput;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;


@RequestMapping("/order")
public interface OrderController {

    @PostMapping("/process-order")
    Boolean processOrder(HttpServletRequest rq, @RequestBody OrderDtoInput cartItem);


}
