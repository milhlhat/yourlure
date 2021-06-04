package com.example.demo.controller.controllerInterface;

import com.example.demo.dto.dtoOut.CategoryDtoOut;
import com.example.demo.entity.Category;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping(path = "/category")
public interface CategoryInterface {

    @GetMapping("/all")
    ResponseEntity<List<CategoryDtoOut>> getAll();

    @GetMapping("/{id}")
    ResponseEntity<Optional<CategoryDtoOut>> getById(@PathVariable int id);

    @PostMapping("/{id}")
    ResponseEntity<Boolean> updateCategory(@RequestBody Category categoryInput, @PathVariable Long idInput);

    @GetMapping("/save")
    ResponseEntity<Boolean> saveCate(@RequestBody Category categoryInput);

    @DeleteMapping("/remove{id}")
    ResponseEntity<Boolean> removeCategory(@PathVariable Long idInput);

}
