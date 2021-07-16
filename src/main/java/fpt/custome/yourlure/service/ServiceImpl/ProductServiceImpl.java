package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.ProductsDtoInp;
import fpt.custome.yourlure.dto.dtoOut.*;
import fpt.custome.yourlure.entity.*;
import fpt.custome.yourlure.repositories.*;
import fpt.custome.yourlure.service.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.*;

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
    private OrderLineRepos orderLineRepos;

    @Autowired
    private FishRepos fishRepos;

    @Autowired
    private ImageRepos imageRepos;

    @Autowired
    private ModelMapper mapper;

    @Override
    public Optional<AdminProductDtoOut> getAll(String keyword, Pageable pageable) {
        List<AdminProductDtoOut.ProductOutput> listResult = new ArrayList<>();
        try {
            int numberOfProduct = 0;
            List<Product> list = productJPARepos.findAllByProductNameContainsIgnoreCase(keyword, pageable).getContent();
            for (Product item : list) {
                AdminProductDtoOut.ProductOutput dtoOut = mapper.map(item, AdminProductDtoOut.ProductOutput.class);
                for (Variant variant : item.getVariantCollection()) {
                    numberOfProduct += variant.getQuantity();
                }
                dtoOut.setNumberOfVariantProduct(numberOfProduct);
                listResult.add(dtoOut);
            }
            AdminProductDtoOut results = AdminProductDtoOut.builder()
                    .productOutputList(listResult)
                    .totalProduct((int) productJPARepos.findAllByProductNameContainsIgnoreCase(keyword, pageable).getTotalElements())
                    .totalPage(productJPARepos.findAllByProductNameContainsIgnoreCase(keyword, pageable).getTotalPages())
                    .build();
            return Optional.of(results);
        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }
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
        try {
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
        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }

//    @Override
//    public List<ProductsDtoOut> findAllByProductName(String keyword, Pageable pageable) {
//        List<ProductsDtoOut> result = new ArrayList<>();
//        List<Product> list = productJPARepos.findAllByProductNameContainsIgnoreCase(keyword, pageable);
//        for (Product item : list) {
//            ProductsDtoOut dtoOut = mapper.map(item, ProductsDtoOut.class);
//            result.add(dtoOut);
//        }
//        return result;
//    }

    @Transactional
    @Override
    public Boolean updateProduct(ProductsDtoInp productsDtoInp, Long id) {
        try {
            if (id != null && productsDtoInp != null) {
                if (productJPARepos.findById(id).isPresent()) {
                    Product productToUpdate = productJPARepos.getById(id);
                    productToUpdate.update(productsDtoInp);
                    productToUpdate.setCategory(categoryRepos.getById(productsDtoInp.getCategoryId()));
                    //update properties product
                    //update image
                    imageRepos.deleteByProductProductId(id);
                    for (String link : productsDtoInp.getImgList()) {
                        Image image = Image.builder()
                                .product(Product.builder().productId(id).build())
                                .linkImage(link)
                                .build();
                        productToUpdate.getImageCollection().add(image);
                    }
                    Product product = productJPARepos.save(productToUpdate);
                    //update fish

                    //clear product in fish_product
                    for (Fish fish : fishRepos.findAll()) {
                        fish.removeProduct(product);
                        fishRepos.save(fish);
                    }

                    //add to fish_product (update)
                    for (Long fishId : productsDtoInp.getListFishId()) {
                        Fish fishInput = fishRepos.getById(fishId);
                        fishInput.addProduct(product);
                        fishRepos.save(fishInput);
                    }
                } else {
                    return false;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Transactional
    @Override
    public Long save(ProductsDtoInp productsDtoInp) {
        try {
            Product product;
            Long idReturn = null;

            if (productsDtoInp != null) {
                //save product
                product = mapper.map(productsDtoInp, Product.class);
                Optional<Category> categoryInput = categoryRepos.findById(productsDtoInp.getCategoryId());
                product.setCategory(categoryInput.get());
                product.setDateCreate(new Date());
                Product productToSaveImage = productJPARepos.save(product);
                idReturn = productToSaveImage.getProductId();
                //add list image product
                List<String> imageLink = productsDtoInp.getImgList();
                for (String link : imageLink) {
                    Image image = Image.builder()
                            .product(productToSaveImage)
                            .linkImage(link)
                            .build();
                    imageRepos.save(image);
                }
                // check fish list is empty
                if (!productsDtoInp.getListFishId().isEmpty()) {
                    //save fish_product
                    for (Long fishId : productsDtoInp.getListFishId()) {
                        Fish fishInput = fishRepos.getById(fishId);
                        fishInput.addProduct(product);
                        //todo: co the se sai. neu sai thi xoa dong tren va nhung thu lien quan ve no
//                fishInput.getProducts().add(product);
                        fishRepos.save(fishInput);
                    }

                }
                return idReturn;
            } else {
                return null;
            }
        } catch (
                Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public AdminProductDetailDtoOut adminGetById(Long id) {
        Optional<Product> findProduct = productJPARepos.findById(id);
        List<Long> listFishId = new ArrayList<>();
        if (findProduct.isPresent()) {
            for (Fish fish : findProduct.get().getFishList()) {
                listFishId.add(fish.getFishId());
            }
        }
        AdminProductDetailDtoOut result = findProduct.map(product -> mapper.map(product, AdminProductDetailDtoOut.class)).orElse(null);
        result.setListFishId(listFishId);
        return result;
    }

    @Override
    public Optional<AdminProductDtoOut> adminSearchProductName(String keyword, Pageable pageable) {
        try {
            List<AdminProductDtoOut.ProductOutput> resultList = new ArrayList<>();
            List<Product> list = (List<Product>) productJPARepos.findAllByProductNameContainsIgnoreCase(keyword, pageable);
            for (Product item : list) {
                AdminProductDtoOut.ProductOutput dtoOut = mapper.map(item, AdminProductDtoOut.ProductOutput.class);
                resultList.add(dtoOut);
            }
            AdminProductDtoOut result = AdminProductDtoOut.builder()
                    .totalPage(productJPARepos.findAllByProductNameContainsIgnoreCase(keyword, pageable).getTotalPages())
                    .totalProduct(productJPARepos.findAllByProductNameContainsIgnoreCase(keyword, pageable).getNumberOfElements())
                    .build();
            return Optional.of(result);
        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }

    @Transactional
    @Override
    public Boolean remove(Long id) {
        try {
            if (orderLineRepos.findByProductIdOrVariantId(id) == null) {
                Optional<Product> productOptional = productJPARepos.findById(id);
                List<Fish> productList = (List<Fish>) productOptional.get().getFishList();
                for (ListIterator<Fish> iter = productList.listIterator(); iter.hasNext(); ) {
                    iter.remove();
                }
                productRepos.remove(productOptional.get());
                return true;
            }
            return false;
        } catch (
                Exception e) {
            e.printStackTrace();
            return false;
        }
    }


}
