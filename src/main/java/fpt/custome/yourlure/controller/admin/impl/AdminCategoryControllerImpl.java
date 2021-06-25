package fpt.custome.yourlure.controller.admin.impl;

import fpt.custome.yourlure.controller.admin.AdminCategoryController;
import fpt.custome.yourlure.dto.dtoInp.CategoryDtoInput;
import fpt.custome.yourlure.dto.dtoOut.CategoryDtoOut;
import fpt.custome.yourlure.entity.Filter;
import fpt.custome.yourlure.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class AdminCategoryControllerImpl implements AdminCategoryController {

    @Autowired
    private CategoryService categoryService;

    @Override
    public ResponseEntity<List<CategoryDtoOut>> findAll() {
        List<CategoryDtoOut> result = categoryService.getAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<CategoryDtoOut>> search(Filter filter) {
        List<CategoryDtoOut> dtoOuts = categoryService.search(filter.getKeyword(), PageRequest.of(filter.getPage(),
                filter.getLimit(), filter.getIsAsc() ? Sort.by(filter.getSortBy()).ascending() : Sort.by(filter.getSortBy()).descending()));
        return new ResponseEntity<>(dtoOuts, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> addCategory(CategoryDtoInput categoryDtoInput) {
        Boolean result = categoryService.saveCate(categoryDtoInput);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Optional<CategoryDtoOut>> getCategoryById(Long id) {
        Optional<CategoryDtoOut> result = categoryService.getById(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> editCategory(Long id, CategoryDtoInput categoryDtoInput) {
        Boolean result = categoryService.updateCategory(categoryDtoInput, id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> deleteCategory(Long id) {
        Boolean result = categoryService.removeCategory(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
