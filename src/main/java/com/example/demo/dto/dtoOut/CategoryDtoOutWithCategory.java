package com.example.demo.dto.dtoOut;

import com.example.demo.entity.Product;

import java.util.Collection;

public class CategoryDtoOutWithCategory {

    private Long categoryID;
    private String categoryName;
    private Collection<Product> productCollection;
}
