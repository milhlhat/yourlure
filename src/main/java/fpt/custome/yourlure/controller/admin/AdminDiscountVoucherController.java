package fpt.custome.yourlure.controller.admin;


import fpt.custome.yourlure.dto.dtoInp.AdminDiscountVoucherDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminDiscountVoucherDtoOut;
import fpt.custome.yourlure.entity.Filter;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RequestMapping("/admin/discount-voucher")
public interface AdminDiscountVoucherController {

    @PostMapping("/all")
    ResponseEntity<Optional<AdminDiscountVoucherDtoOut>> findAll(@RequestBody  Filter filter);

    @PostMapping("/add")
    ResponseEntity<Boolean> save(@RequestBody AdminDiscountVoucherDtoInput discountVoucherDtoInput);

//    @GetMapping("/{id}")
//    ResponseEntity<Optional<DiscountSale>> getProductById(@PathVariable("id") Long id);

//    @GetMapping("/search-product")
//    ResponseEntity<List<DiscountSale>> searchProduct(@RequestParam("productName") String id);

    @PostMapping("/update/")
    ResponseEntity<Boolean> update(@PathVariable("id") Long id, @RequestBody @Validated AdminDiscountVoucherDtoInput discountVoucherDtoInput);

    @DeleteMapping("/remove/{id}")
    ResponseEntity<Boolean> delete(@PathVariable("id") Long id);

}
