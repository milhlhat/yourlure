package fpt.custome.yourlure.controller.admin;

import fpt.custome.yourlure.entity.DiscountVoucher;
import fpt.custome.yourlure.entity.Filter;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/admin/discount-voucher")
public interface AdminDiscountSaleController {

    @GetMapping("/all")
    ResponseEntity<List<DiscountVoucher>> getAll();

    @PostMapping("/search")
    List<DiscountVoucher> search(@RequestBody Filter filter);

    @GetMapping("/{id}")
    Optional<DiscountVoucher> getOrderById(@PathVariable("id") Long id);

    @PostMapping("/add")
    ResponseEntity<Boolean> save(@RequestBody DiscountVoucher discountVoucher);

    @PostMapping("/{id}")
    Optional<DiscountVoucher> editOrder(@PathVariable("id") Long id, @RequestBody @Validated DiscountVoucher discountVoucher);

    @DeleteMapping("/{id}")
    Boolean deleteOrder(@PathVariable("id") Long id);

}