package com.example.demo.repositories;

import com.example.demo.entity.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepos extends CrudRepository<Category, Long> {
}
