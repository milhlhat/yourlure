package com.example.demo.dto.dtoOut;

import com.example.demo.entity.Products;

import java.util.Collection;

public class CategoryDtoOutWithCategory {

    private Long categoryID;
    private String categoryName;
    private Collection<Products> productsCollection;
}
