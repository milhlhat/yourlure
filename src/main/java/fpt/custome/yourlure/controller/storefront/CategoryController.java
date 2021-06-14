package fpt.custome.yourlure.controller.storefront;

import fpt.custome.yourlure.dto.dtoOut.CategoryDtoOut;
import fpt.custome.yourlure.dto.dtoOut.CategoryDtoOutWithCategory;
import fpt.custome.yourlure.entity.Category;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RequestMapping(path = "/api/category")
public interface CategoryController {

    @GetMapping("/all")
    ResponseEntity<List<CategoryDtoOut>> getAll();

    @GetMapping("/{id}")
    ResponseEntity<Optional<CategoryDtoOut>> getById(@PathVariable Long id);

    @GetMapping("/best-seller-with-category")
    ResponseEntity<List<CategoryDtoOutWithCategory>> getBestSellerWithCategory();

    @PostMapping("/{id}")
    ResponseEntity<Boolean> updateCategory(@RequestBody Category categoryInput, @PathVariable Long id);

    @PostMapping("/save")
    ResponseEntity<Boolean> saveCate(@RequestBody Category categoryInput);

    @DeleteMapping("/remove/{id}")
    ResponseEntity<Boolean> removeCategory(@PathVariable Long id);

}
