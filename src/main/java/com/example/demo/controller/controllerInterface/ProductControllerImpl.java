package com.example.demo.controller.controllerInterface;

import com.example.demo.dto.dtoInp.ProductsDtoInp;
import com.example.demo.dto.dtoOut.ProductOutPageable;
import com.example.demo.dto.dtoOut.ProductsDtoOut;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping(path = "/product")
public interface ProductControllerImpl {

    @PostMapping("/all")
    ResponseEntity<ProductOutPageable> getAll(@RequestParam(value = "page") int page,
                                              @RequestParam(value = "limit") int limit);

    @GetMapping("/{id}")
    ResponseEntity<Optional<ProductsDtoOut>> getById(@PathVariable Long id);

    @GetMapping("/best-seller")
    ResponseEntity<List<ProductsDtoOut>> getBestSeller();

    @GetMapping("/newest")
    ResponseEntity<List<ProductsDtoOut>> getNewestProduct();

    @GetMapping("/filter-category")
    ResponseEntity<List<ProductsDtoOut>> getProductByCategoryAndFish(@RequestParam List<Long> listCateId,
                                                                     @RequestParam List<Long> listFishId,
                                                                     @RequestParam(value = "page") int page,
                                                                     @RequestParam(value = "limit") int limit);

    @GetMapping("/find-by-name")
    ResponseEntity<List<ProductsDtoOut>> getProductByName(
            @RequestParam(value = "product_name") String product_name,
                                                          @RequestParam(value = "page") int page,
                                                          @RequestParam(value = "limit") int limit);

    //TODO: getmapping customize

    @PostMapping("/{id}")
    ResponseEntity<Boolean> updateProduct(@RequestBody ProductsDtoInp productsDtoInp, @PathVariable Long id);

    @GetMapping("/save")
    ResponseEntity<Boolean> saveCate(@RequestBody ProductsDtoInp productsDtoInp);

    @DeleteMapping("/remove{id}")
    ResponseEntity<Boolean> removeCategory(@PathVariable Long id);

}
