package com.example.demo.Service.impl;

import com.example.demo.Service.impl.CategoryServiceImpl.CategoryServiceImpl;
import com.example.demo.dto.dtoOut.CategoryDtoOut;
import com.example.demo.dto.dtoOut.CategoryDtoOutWithCategory;
import com.example.demo.entity.Category;
import com.example.demo.repositories.CategoryRepos;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService implements CategoryServiceImpl {

    @Autowired
    CategoryRepos categoryRepos;

    // Tạo mapper object
    ModelMapper mapper = new ModelMapper();

    @Override
    public List<CategoryDtoOut> getAll() {
        List<Category> categoryList = categoryRepos.findAll();
        List<CategoryDtoOut> categoryDtoOuts = new ArrayList<>();
        for (Category category : categoryList) {
            CategoryDtoOut categoryDtoOut = mapper.map(category, CategoryDtoOut.class);
            categoryDtoOuts.add(categoryDtoOut);
        }
        return categoryDtoOuts;
    }

    @Override
    public Optional<CategoryDtoOut> getById(Long id) {
        //Todo: validate

        Optional<Category> category = categoryRepos.findById(id);
        if (category.isPresent()) {
            CategoryDtoOut categoryDtoOut = mapper.map(category.get(), CategoryDtoOut.class);
            return Optional.of(categoryDtoOut);
        }
        return Optional.empty();
    }

    @Override
    public List<CategoryDtoOutWithCategory> getBestSellerWithCategory() {
        List<CategoryDtoOutWithCategory> result = new ArrayList<>();
        List<Category> list = categoryRepos.getBestSellerWithCategory();
        for (Category item : list) {
            CategoryDtoOutWithCategory dtoOut = mapper.map(item, CategoryDtoOutWithCategory.class);
            result.add(dtoOut);
        }
        return result;
    }

    @Override
    public Boolean updateCategory(Category categoryInput, Long idInput) {
        try {
            //todo: thêm validate
            if (idInput != null && categoryInput != null) {
                Category categoryToUpdate = categoryRepos.findById(idInput).get();
                categoryToUpdate.builder()
                        .categoryName(categoryInput.getCategoryName())
                        .build();
                categoryRepos.save(categoryToUpdate);
            }
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public Boolean saveCate(Category categoryInput) {
        Category category;
        if (categoryInput != null)
            category = mapper.map(categoryInput, Category.class);
        else return false;
        return categoryRepos.save(category) == null ? false : true;
    }

    @Override
    public Boolean removeCategory(Long idInput) {
        try {
            categoryRepos.deleteById(idInput);
        } catch (
                Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
