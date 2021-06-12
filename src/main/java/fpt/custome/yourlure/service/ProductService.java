package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoInp.ProductsDtoInp;
import fpt.custome.yourlure.dto.dtoOut.ProductsDetailDtoOut;
import fpt.custome.yourlure.dto.dtoOut.ProductsDtoOut;
import fpt.custome.yourlure.dto.dtoOut.ProductsFilterDtoOut;
import fpt.custome.yourlure.entity.Filter;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    List<ProductsDetailDtoOut> getAll(Pageable pageable);

    Integer totalItem();

    ProductsDetailDtoOut getById(Long id);

    List<ProductsDtoOut> getBestSeller();

    List<ProductsDtoOut> getNewestProduct();

    Optional<ProductsFilterDtoOut> getProductFilter(Filter filter);

    List<ProductsDtoOut> findAllByProductName(String keyword, Pageable pageable);

    Boolean updateProduct(ProductsDtoInp productsDtoInp, Long id);

    Boolean save(ProductsDtoInp productsDtoInp);

    Boolean remove(Long id);

}
