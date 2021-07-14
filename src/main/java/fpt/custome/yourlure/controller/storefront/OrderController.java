package fpt.custome.yourlure.controller.storefront;

import fpt.custome.yourlure.dto.dtoInp.OrderGuestDtoInput;
import fpt.custome.yourlure.dto.dtoInp.OrderUserDtoInput;
import fpt.custome.yourlure.dto.dtoOut.StoreUserOrderDtoOut;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Min;
import java.util.Optional;


@RequestMapping("/api/order")
@Validated
public interface OrderController {

    @PostMapping("/verify-discount")
    ResponseEntity<Object> verifyDiscount(@RequestParam String code);

    @PostMapping("/guest-process-order")
    ResponseEntity<Object> guestProcessOrder(@RequestBody @Valid OrderGuestDtoInput order);

    @PostMapping("/user-process-order")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    ResponseEntity<Object> userProcessOrder(HttpServletRequest rq, @RequestBody @Valid OrderUserDtoInput order);

    @GetMapping("/user-order")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    ResponseEntity<Optional<StoreUserOrderDtoOut>> getListUserOrder(HttpServletRequest rq,
                                                                    @RequestParam Integer page,
                                                                    @RequestParam @Min(1) Integer limit);



}
