package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoInp.CategoryDtoInput;
import fpt.custome.yourlure.dto.dtoOut.CategoryDtoOut;
import fpt.custome.yourlure.dto.dtoOut.CategoryDtoOutWithCategory;
import fpt.custome.yourlure.entity.Category;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface CategoryService {

    //store front --------------------------------------
    List<CategoryDtoOutWithCategory> getBestSellerWithCategory();

    //common service --------------------------------------
    List<CategoryDtoOut> getAll();

    //admin front --------------------------------------
    Optional<CategoryDtoOut> getById(Long id);

    List<CategoryDtoOut> search(String keyword, Pageable pageable);

    Boolean saveCate(CategoryDtoInput categoryInput);

    Boolean removeCategory(Long idInput);

    Boolean updateCategory(CategoryDtoInput categoryInput, Long idInput);
}
