package com.example.demo.controller.controllerImpl;

import com.example.demo.controller.CategoryController;
import com.example.demo.service.CategoryService;
import com.example.demo.dto.dtoOut.CategoryDtoOut;
import com.example.demo.dto.dtoOut.CategoryDtoOutWithCategory;
import com.example.demo.entity.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

/**
 * The Foo class category controller
 */
@RestController
@RequiredArgsConstructor
public class CategoryControllerImpl implements CategoryController {

    @Autowired
    CategoryService categoryService;

    /**
     * add category to data
     *
     * @param categoryInput list category
     * @return if add successful return true else false
     */
    @Override
    public ResponseEntity<Boolean> saveCate(Category categoryInput) {
        Boolean save = categoryService.saveCate(categoryInput);
        return new ResponseEntity<>(save, HttpStatus.OK);

    }

    /**
     * add category to data
     *
     * @param id id want to delete
     * @return no return
     */
    @Override
    public ResponseEntity<Boolean> removeCategory(Long id) {
        Boolean delete = categoryService.removeCategory(id);
        return new ResponseEntity<>(delete, HttpStatus.OK);
    }

    /**
     * show all category
     *
     * @return return list of category
     */
    @Override
    public ResponseEntity<List<CategoryDtoOut>> getAll() {
        List<CategoryDtoOut> categoryDtoOuts = categoryService.getAll();
        return new ResponseEntity<>(categoryDtoOuts, HttpStatus.OK);
    }

    /**
     * find category by id in data
     *
     * @param id id want to find
     * @return return optional category find
     */
    @Override
    public ResponseEntity<Optional<CategoryDtoOut>> getById(Long id) {
        Optional<CategoryDtoOut> dtoOut = categoryService.getById(id);
        return new ResponseEntity<>(dtoOut, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<CategoryDtoOutWithCategory>> getBestSellerWithCategory() {
        List<CategoryDtoOutWithCategory> dtoOuts = categoryService.getBestSellerWithCategory();
        return new ResponseEntity<>(dtoOuts, HttpStatus.OK);
    }

    /**
     * update category to data
     *
     * @param categoryInput category update
     * @param idInput       id want to edit
     * @return if update successful return true else false
     */
    @Override
    public ResponseEntity<Boolean> updateCategory(Category categoryInput, Long id) {
        Boolean update = categoryService.updateCategory(categoryInput, id);
        return new ResponseEntity<>(update, HttpStatus.OK);
    }

}
