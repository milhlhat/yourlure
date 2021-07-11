package fpt.custome.yourlure.controller.admin;

import fpt.custome.yourlure.dto.dtoInp.CategoryDtoInput;
import fpt.custome.yourlure.dto.dtoOut.CategoryDtoOut;
import fpt.custome.yourlure.entity.Filter;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RequestMapping("/admin/category")
public interface AdminCategoryController {

    @GetMapping("/all")
    ResponseEntity<List<CategoryDtoOut>> findAll();

    @PostMapping("/search")
    ResponseEntity<List<CategoryDtoOut>> search(@RequestBody Filter filter);

    @PostMapping("/add")
    ResponseEntity<Boolean> addCategory(@RequestBody CategoryDtoInput categoryDtoInput);

    @GetMapping("/{id}")
    ResponseEntity<Optional<CategoryDtoOut>> getCategoryById(@PathVariable("id") Long id);

    @PostMapping("/{id}")
    ResponseEntity<Boolean> editCategory(@PathVariable("id") Long id, @RequestBody @Validated CategoryDtoInput categoryDtoInput);

    @DeleteMapping("/{id}")
    ResponseEntity<Boolean> deleteCategory(@PathVariable("id") Long id);


}