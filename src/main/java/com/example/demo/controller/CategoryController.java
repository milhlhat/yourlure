package com.example.demo.controller;

import com.example.demo.dto.dtoOut.CategoryDtoOut;
import com.example.demo.dto.dtoOut.CategoryDtoOutWithCategory;
import com.example.demo.entity.Category;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping(path = "/category")
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
