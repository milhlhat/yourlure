package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.ProductsDtoInp;
import fpt.custome.yourlure.dto.dtoOut.*;
import fpt.custome.yourlure.entity.Category;
import fpt.custome.yourlure.entity.Filter;
import fpt.custome.yourlure.entity.Fish;
import fpt.custome.yourlure.entity.Product;
import fpt.custome.yourlure.repositories.*;
import fpt.custome.yourlure.service.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductJpaRepos productJPARepos;

    @Autowired
    private ProductRepos productRepos;

    @Autowired
    private CategoryRepos categoryRepos;

    @Autowired
    private VariantRepos variantRepos;

    @Autowired
    private FishRepos fishRepos;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<AdminProductDtoOut> getAll(Pageable pageable) {
        List<AdminProductDtoOut> results = new ArrayList<>();
        try {
            List<Product> list = productJPARepos.findAll(pageable).getContent();
            for (Product item : list) {
                AdminProductDtoOut dtoOut = mapper.map(item, AdminProductDtoOut.class);
                results.add(dtoOut);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return results;
    }

    @Override
    public Integer totalItem() {
        try {
            return productJPARepos.findAll().size();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public ProductsDetailDtoOut getById(Long id) {
        try {
            Optional<Product> findProduct = productJPARepos.findById(id);
            return findProduct.map(product -> mapper.map(product, ProductsDetailDtoOut.class)).orElse(null);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<ProductsDtoOut> getBestSeller() {
        List<ProductsDtoOut> results = new ArrayList<>();
        List<Product> list = productJPARepos.bestSellerProduct();
        for (Product item : list) {
            ProductsDtoOut dtoOut = mapper.map(item, ProductsDtoOut.class);
            results.add(dtoOut);
        }
        return results;
    }

    @Override
    public List<ProductsDtoOut> getNewestProduct() {
        List<ProductsDtoOut> result = new ArrayList<>();
        List<Product> list = productJPARepos.findAll(Sort.by(Sort.Direction.DESC, "dateCreate"));
        for (Product item : list) {
            ProductsDtoOut dtoOut = mapper.map(item, ProductsDtoOut.class);
            result.add(dtoOut);
        }
        return result;
    }

    @Override
    public Optional<ProductsFilterDtoOut> getProductFilter(Filter filter) {
        Query query = productRepos.getProductFilter(filter);
        int totalProduct = query.getResultList().size();
        query.setFirstResult(filter.getLimit() * filter.getPage());
        query.setMaxResults(filter.getLimit());
        List<ProductsFilterDtoOut.ProductOut> productOutList = new ArrayList<>();
        List<Product> list = query.getResultList();
        for (Product item : list) {
            ProductsFilterDtoOut.ProductOut dtoOut = mapper.map(item, ProductsFilterDtoOut.ProductOut.class);
            productOutList.add(dtoOut);
        }

        ProductsFilterDtoOut result = ProductsFilterDtoOut.builder()
                .productOutList(productOutList)
                .totalProduct(totalProduct)
                .totalPage((int) Math.ceil((double) totalProduct / filter.getLimit()))
                .build();
        return Optional.of(result);
    }

    @Override
    public List<ProductsDtoOut> findAllByProductName(String keyword, Pageable pageable) {
        List<ProductsDtoOut> result = new ArrayList<>();
        List<Product> list = productJPARepos.findAllByProductNameContainsIgnoreCase(keyword, pageable);
        for (Product item : list) {
            ProductsDtoOut dtoOut = mapper.map(item, ProductsDtoOut.class);
            result.add(dtoOut);
        }
        return result;
    }

    @Override
    public Boolean updateProduct(ProductsDtoInp productsDtoInp, Long id) {
        try {
            if (id != null && productsDtoInp != null) {
                if (productJPARepos.findById(id).isPresent()) {
                    Optional<Product> productOptional = productJPARepos.findById(id);
                    Product productToUpdate = productOptional.get();
                    productToUpdate.update(productsDtoInp);
                    productJPARepos.save(productToUpdate);
                } else {
                    return false;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return true;
    }

    @Override
    public Boolean save(ProductsDtoInp productsDtoInp) {
        try {
            Product product;
            if (productsDtoInp != null) {
                //save product
                product = mapper.map(productsDtoInp, Product.class);
                Optional<Category> categoryInput = categoryRepos.findById(productsDtoInp.getCategoryId());
                product.setCategory(categoryInput.get());
                productJPARepos.save(product);

                //save fish_product
                Optional<Fish> fishOptional = fishRepos.findById(productsDtoInp.getFishId());
                Fish fishInput = fishOptional.get();
                fishInput.getProducts().add(product);
                fishRepos.save(fishInput);
            } else {
                return false;
            }
        } catch (
                Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public AdminProductDetailDtoOut adminGetById(Long id) {
        Optional<Product> findProduct = productJPARepos.findById(id);
        return findProduct.map(product -> mapper.map(product, AdminProductDetailDtoOut.class)).orElse(null);
    }

    @Override
    public List<AdminProductDtoOut> adminSearchProductName(String keyword, Pageable pageable) {
        try {
            List<AdminProductDtoOut> result = new ArrayList<>();
            List<Product> list = productJPARepos.findAllByProductNameContainsIgnoreCase(keyword, pageable);
            for (Product item : list) {
                AdminProductDtoOut dtoOut = mapper.map(item, AdminProductDtoOut.class);
                result.add(dtoOut);
            }
            return result;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Boolean remove(Long id) {
        try {
            productJPARepos.deleteById(id);
        } catch (
                Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return false;
        }
        return true;
    }


}
