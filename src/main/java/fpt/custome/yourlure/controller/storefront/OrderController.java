package fpt.custome.yourlure.controller.storefront;

import fpt.custome.yourlure.dto.dtoInp.OrderGuestDtoInput;
import fpt.custome.yourlure.dto.dtoInp.OrderUserDtoInput;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;


@RequestMapping("/api/order")
public interface OrderController {

    @PostMapping("/guest-process-order")
    ResponseEntity<Object> guestProcessOrder(@RequestBody OrderGuestDtoInput order);

    @PostMapping("/user-process-order")
    ResponseEntity<Object> userProcessOrder(HttpServletRequest rq, @RequestBody OrderUserDtoInput order);


}
