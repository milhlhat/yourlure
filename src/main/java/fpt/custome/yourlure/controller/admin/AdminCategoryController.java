package fpt.custome.yourlure.controller.admin;

import fpt.custome.yourlure.entity.Category;
import fpt.custome.yourlure.entity.Filter;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RequestMapping("/admin/category")
public interface AdminCategoryController {

    @GetMapping("/all")
    List<Category> findAll();

    @PostMapping("/search")
    List<Category> search(@RequestBody Filter filter);

    @PostMapping("/add")
    Boolean addCategory(@RequestBody Category category);

    @GetMapping("/{id}")
    Optional<Category> getCategoryById(@PathVariable("id") Long id);

    @PostMapping("/{id}")
    Category editCategory(@PathVariable("id") Long id, @RequestBody @Validated Category category);

    @DeleteMapping("/{id}")
    Boolean deleteCategory(@PathVariable("id") Long id);


}
