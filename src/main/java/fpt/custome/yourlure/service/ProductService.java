package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoInp.ProductsDtoInp;
import fpt.custome.yourlure.dto.dtoOut.*;
import fpt.custome.yourlure.entity.Filter;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ProductService {


    // store front **************************
    Integer totalItem();

    ProductsDetailDtoOut getById(Long id);

    List<ProductsDtoOut> getBestSeller();

    List<ProductsDtoOut> getNewestProduct();

    Optional<ProductsFilterDtoOut> getProductFilter(Filter filter);

//    List<ProductsDtoOut> findAllByProductName(String keyword, Pageable pageable);

    // Admin front **************************

    Optional<AdminProductDtoOut> getAll(String keyword, Pageable pageable);

    Long save(ProductsDtoInp productsDtoInp);

    AdminProductDetailDtoOut adminGetById(Long id);

    Optional<AdminProductDtoOut> adminSearchProductName(String keyword, Pageable pageable);

    Boolean updateProduct(ProductsDtoInp productsDtoInp, Long id);

    Boolean remove(Long id);

    Boolean block(Long id);

}
