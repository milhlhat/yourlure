package fpt.custome.yourlure.controller.admin;


import fpt.custome.yourlure.entity.DiscountSale;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/admin/discount-sale")
public interface AdminDiscountVoucherController {

    @GetMapping("/all")
    ResponseEntity<List<DiscountSale>> findAll();

    @PostMapping("/add")
    ResponseEntity<Boolean> addProduct(@RequestBody DiscountSale discountSale);

    @GetMapping("/{id}")
    ResponseEntity<Optional<DiscountSale>> getProductById(@PathVariable("id") Long id);

    @GetMapping("/search-product")
    ResponseEntity<List<DiscountSale>> searchProduct(@RequestParam("productName") String id);

    @PostMapping("/{id}")
    ResponseEntity<DiscountSale> editProduct(@PathVariable("id") Long id, @RequestBody @Validated DiscountSale discountSale);

    @DeleteMapping("/{id}")
    ResponseEntity<Boolean> deleteProduct(@PathVariable("id") Long id);

}
