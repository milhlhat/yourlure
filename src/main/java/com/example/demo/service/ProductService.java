package com.example.demo.service;

import com.example.demo.dto.dtoInp.ProductsDtoInp;
import com.example.demo.dto.dtoOut.ProductsDtoOut;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {

    List<ProductsDtoOut> getAll(Pageable pageable);

    int totalItem();

    ProductsDtoOut getById(Long id);

    List<ProductsDtoOut> getBestSeller();

    List<ProductsDtoOut> getNewestProduct();

    List<ProductsDtoOut> getProductByCategoryAndFish(List<Long> listCateId, List<Long> listFishId);

    List<ProductsDtoOut> findAllByProductName(String keyword, Pageable pageable);

    Boolean updateProduct(ProductsDtoInp productsDtoInp, Long id);

    Boolean save(ProductsDtoInp productsDtoInp);

    Boolean remove(Long id);

}
