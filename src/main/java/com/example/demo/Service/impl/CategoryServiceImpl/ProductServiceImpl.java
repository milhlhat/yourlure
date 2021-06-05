package com.example.demo.Service.impl.CategoryServiceImpl;

import com.example.demo.dto.dtoInp.ProductsDtoInp;
import com.example.demo.dto.dtoOut.CategoryDtoOut;
import com.example.demo.dto.dtoOut.ProductsDtoOut;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ProductServiceImpl {

    List<ProductsDtoOut> getAll(Pageable pageable);

    int totalItem();

    ProductsDtoOut getById(Long id);

    List<ProductsDtoOut> getBestSeller();

    List<ProductsDtoOut> getNewestProduct();

    List<CategoryDtoOut> getBestSellerWithCategory();

    List<ProductsDtoOut> getProductByCategory(List<Long> listCateId, List<Long> listFishId);

    List<ProductsDtoOut> getProductByName(String product_name);

    Boolean updateProduct(ProductsDtoInp productsDtoInp, Long id);

    Boolean saveCate(ProductsDtoInp productsDtoInp);

    Boolean removeCategory(Long id);
}
