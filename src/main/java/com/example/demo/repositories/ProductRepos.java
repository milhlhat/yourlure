package com.example.demo.repositories;

import com.example.demo.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductRepos extends JpaRepository<Product, Long> {
}
