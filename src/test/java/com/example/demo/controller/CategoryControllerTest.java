//package com.example.demo.controller;
//
//import com.example.demo.entity.Category;
//import com.example.demo.repositories.CategoryRepos;
//import org.junit.jupiter.api.Test;
//import org.junit.runner.RunWith;
//import org.mockito.Mockito;
//import org.mockito.junit.MockitoJUnitRunner;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import java.util.Optional;
//
//@SpringBootTest
//@RunWith(MockitoJUnitRunner.class)
//class CategoryControllerTest {
//
//    @Autowired
//    private CategoryRepos categoryRepos;
//
//    @Autowired
//    private CategoryController categoryController = new CategoryController();
//
//    @Test
//    void createSample() {
//
//    }
//
//    @Test
//    void addCategory() {
////        categoryController = new CategoryController();
////        Category categoryInput = new Category("son");
////        categoryController.addCategory(categoryInput);
//    }
//
//    @Test
//    void editCategory() {
//        try {
//            //Prepare data
//            long idInput = 1;
//            Category categoryInput = new Category("son");
//            categoryInput.setId(idInput);
//            Optional<Category> categories = Optional.of(categoryInput);
//
//            //mock data
//            categoryRepos = Mockito.mock(CategoryRepos.class);
//            Mockito.when(categoryRepos.findById(idInput)).thenReturn(categories);
//
//            //run
//            categoryController.editCategory(categoryInput, idInput);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//
//    @Test
//    void showCategories() {
//    }
//}