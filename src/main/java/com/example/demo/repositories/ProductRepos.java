package com.example.demo.repositories;

import com.example.demo.entity.Products;
import org.springframework.data.repository.CrudRepository;


public interface ProductRepos extends CrudRepository<Products, Long> {
}
