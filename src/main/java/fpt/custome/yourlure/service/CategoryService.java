package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoOut.CategoryDtoOut;
import fpt.custome.yourlure.dto.dtoOut.CategoryDtoOutWithCategory;
import fpt.custome.yourlure.entity.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryService {

    //store front --------------------------------------
    List<CategoryDtoOutWithCategory> getBestSellerWithCategory();

    //common service --------------------------------------
    List<CategoryDtoOut> getAll();

    //admin front --------------------------------------
    Optional<CategoryDtoOut> getById(Long id);

    Boolean saveCate(Category categoryInput);

    Boolean removeCategory(Long idInput);

    Boolean updateCategory(Category categoryInput, Long idInput);
}
