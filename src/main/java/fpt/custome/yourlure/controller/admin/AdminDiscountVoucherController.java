package fpt.custome.yourlure.controller.admin;


import fpt.custome.yourlure.dto.dtoInp.AdminDiscountVoucherDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminDiscountVoucherDetailDtoOut;
import fpt.custome.yourlure.dto.dtoOut.AdminDiscountVoucherDtoOut;
import fpt.custome.yourlure.entity.Filter;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RequestMapping("/admin/discount-voucher")

public interface AdminDiscountVoucherController {

    @PostMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Optional<AdminDiscountVoucherDtoOut>> findAll(@RequestBody @Valid Filter filter);

    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Boolean> save(@RequestBody @Valid AdminDiscountVoucherDtoInput discountVoucherDtoInput);

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Optional<AdminDiscountVoucherDetailDtoOut>> getById(@PathVariable("id") Long id);

//    @GetMapping("/search-product")
//    ResponseEntity<List<DiscountSale>> searchProduct(@RequestParam("productName") String id);

    @PostMapping("/update")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Boolean> update(@RequestParam("id") Long id, @RequestBody @Valid AdminDiscountVoucherDtoInput discountVoucherDtoInput);

    @DeleteMapping("/remove/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Boolean> delete(@PathVariable("id") Long id);

}
