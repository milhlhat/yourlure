package com.example.demo.controller;

import com.example.demo.controller.controllerInterface.CategoryInterface;
import com.example.demo.dto.dtoOut.CategoryDtoOut;
import com.example.demo.entity.Category;
import com.example.demo.repositories.CategoryRepos;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * The Foo class category controller
 */
@RestController
@RequiredArgsConstructor
public class CategoryController implements CategoryInterface {

    @Autowired
    private CategoryRepos categoryRepos;

    // Tạo mapper object
    ModelMapper mapper = new ModelMapper();

    /**
     * add category to data
     *
     * @param categoryInput list category
     * @return no return
     */
    @Override
    public ResponseEntity<Boolean> saveCate(Category categoryInput) {
        return null;
    }

    @Override
    public ResponseEntity<Boolean> removeCategory(Long idInput) {
        return null;
    }

    /**
     * show all category
     *
     * @return return list of category
     */
    @Override
    public ResponseEntity<List<CategoryDtoOut>> getAll() {
        List<Category> categoryList = categoryRepos.findAll();
        List<CategoryDtoOut> categoryDtoOuts = new ArrayList<>();
        for (Category category : categoryList) {
            CategoryDtoOut categoryDtoOut = mapper.map(category, CategoryDtoOut.class);
            categoryDtoOuts.add(categoryDtoOut);
        }
        return new ResponseEntity<>(categoryDtoOuts, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Optional<CategoryDtoOut>> getById(int id) {
        //        try {
//            if (idInput != null && categoryInput != null) {
//                Optional<Category> categories = categoryRepos.findById(idInput);
//                Category categoryToUpdate = categories.get();
//                categoryToUpdate.setName(categoryInput.getName());
//                categoryRepos.save(categoryToUpdate);
//            }
//        } catch (Exception e) {
//            // TODO Auto-generated catch block
//            e.printStackTrace();
//        }
        return null;
    }

    /**
     * add category to data
     *
     * @param categoryInput category update
     * @param idInput       id want to edit
     * @return no return
     */
    @Override
    public ResponseEntity<Boolean> updateCategory(Category categoryInput, Long idInput) {
        return null;
    }

}
