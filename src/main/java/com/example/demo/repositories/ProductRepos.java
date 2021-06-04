package com.example.demo.repositories;

import com.example.demo.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductRepos extends JpaRepository<Products, Long> {
}
