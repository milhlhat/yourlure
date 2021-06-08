package fpt.custome.yourlure.controller.storefront;

import fpt.custome.yourlure.dto.dtoInp.ProductsDtoInp;
import fpt.custome.yourlure.dto.dtoOut.ProductsDtoOut;
import fpt.custome.yourlure.entity.Filter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping(path = "/product")
public interface ProductController {

//    @PostMapping("/all")
//    ResponseEntity<ProductOutPageable> getAll(@RequestParam(value = "page") Filter filter);

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

    @PostMapping("/find-by-name")
    ResponseEntity<List<ProductsDtoOut>> getProductByName(@RequestBody Filter filter);

    //TODO: getmapping customize

    @PostMapping("/{id}")
    ResponseEntity<Boolean> updateProduct(@RequestBody ProductsDtoInp productsDtoInp, @PathVariable Long id);

    @GetMapping("/save")
    ResponseEntity<Boolean> saveCate(@RequestBody ProductsDtoInp productsDtoInp);

    @DeleteMapping("/remove{id}")
    ResponseEntity<Boolean> removeCategory(@PathVariable Long id);

}
