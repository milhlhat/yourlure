package com.example.demo.Service.impl.CategoryServiceImpl;

import com.example.demo.dto.dtoOut.CategoryDtoOut;
import com.example.demo.dto.dtoOut.CategoryDtoOutWithCategory;
import com.example.demo.entity.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryServiceImpl {

    List<CategoryDtoOut> getAll();

    Optional<CategoryDtoOut> getById(Long id);

    List<CategoryDtoOutWithCategory> getBestSellerWithCategory();

    Boolean updateCategory(Category categoryInput, Long idInput);

    Boolean saveCate(Category categoryInput);

    Boolean removeCategory(Long idInput);

}
