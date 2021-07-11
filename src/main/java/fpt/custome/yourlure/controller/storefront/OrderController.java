package fpt.custome.yourlure.controller.storefront;

import fpt.custome.yourlure.dto.dtoInp.OrderGuestDtoInput;
import fpt.custome.yourlure.dto.dtoInp.OrderUserDtoInput;
import fpt.custome.yourlure.dto.dtoOut.StoreUserOrderDtoOut;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;


@RequestMapping("/api/order")
public interface OrderController {

    @PostMapping("/verify-discount")
    ResponseEntity<Object> verifyDiscount(@RequestParam String code);

    @PostMapping("/guest-process-order")
    ResponseEntity<Object> guestProcessOrder(@RequestBody OrderGuestDtoInput order);

    @PostMapping("/user-process-order")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    ResponseEntity<Object> userProcessOrder(HttpServletRequest rq, @RequestBody OrderUserDtoInput order);

    @GetMapping("/user-order")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    ResponseEntity<Optional<StoreUserOrderDtoOut>> getListUserOrder(HttpServletRequest rq,
                                                                    @RequestParam Integer page,
                                                                    @RequestParam Integer limit);



}
