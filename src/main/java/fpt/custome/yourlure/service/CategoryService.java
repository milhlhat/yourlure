package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoOut.CategoryDtoOut;
import fpt.custome.yourlure.dto.dtoOut.CategoryDtoOutWithCategory;
import fpt.custome.yourlure.entity.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryService {

    List<CategoryDtoOut> getAll();

    Optional<CategoryDtoOut> getById(Long id);

    List<CategoryDtoOutWithCategory> getBestSellerWithCategory();

    Boolean updateCategory(Category categoryInput, Long idInput);

    Boolean saveCate(Category categoryInput);

    Boolean removeCategory(Long idInput);

}
