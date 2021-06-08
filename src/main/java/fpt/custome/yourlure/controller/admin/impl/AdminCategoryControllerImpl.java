package fpt.custome.yourlure.controller.admin.impl;

import fpt.custome.yourlure.controller.admin.AdminCategoryController;
import fpt.custome.yourlure.entity.Category;
import fpt.custome.yourlure.entity.Filter;

import java.util.List;
import java.util.Optional;

public class AdminCategoryControllerImpl implements AdminCategoryController {
    @Override
    public List<Category> findAll() {
        return null;
    }

    @Override
    public List<Category> search(Filter filter) {
        return null;
    }

    @Override
    public Boolean addCategory(Category category) {
        return null;
    }

    @Override
    public Optional<Category> getCategoryById(Long id) {
        return Optional.empty();
    }

    @Override
    public Category editCategory(Long id, Category category) {
        return null;
    }

    @Override
    public Boolean deleteCategory(Long id) {
        return null;
    }
}
