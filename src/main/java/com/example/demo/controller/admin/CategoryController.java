package com.example.demo.controller.admin;

import com.example.demo.entity.Category;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/admin/category")
public interface CategoryController {


    @PostMapping("/add")
    Boolean addCategory(@RequestBody Category category);

    @GetMapping("/{id}")
    Optional<Category> getCategoryById(@PathVariable("id") Long id);

    @PostMapping("/{id}")
    Category editCategory(@PathVariable("id") Long id, @RequestBody @Validated Category category);

    @DeleteMapping("/{id}")
    Boolean deleteCategory(@PathVariable("id") Long id);


}
