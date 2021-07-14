package fpt.custome.yourlure.controller.admin;

import fpt.custome.yourlure.entity.DiscountVoucher;
import fpt.custome.yourlure.entity.Filter;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RequestMapping("/admin/discount-voucher")

public interface AdminDiscountSaleController {

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<List<DiscountVoucher>> getAll();

    @PostMapping("/search")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    List<DiscountVoucher> search(@RequestBody @Valid Filter filter);

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    Optional<DiscountVoucher> getOrderById(@PathVariable("id") Long id);

    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Boolean> save(@RequestBody @Valid DiscountVoucher discountVoucher);

    @PostMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    Optional<DiscountVoucher> editOrder(@PathVariable("id") Long id, @RequestBody @Valid DiscountVoucher discountVoucher);

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    Boolean deleteOrder(@PathVariable("id") Long id);

}
