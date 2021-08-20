package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.controller.admin.AdminProductController;
import fpt.custome.yourlure.dto.dtoInp.ProductsDtoInp;
import fpt.custome.yourlure.dto.dtoOut.*;
import fpt.custome.yourlure.entity.*;
import fpt.custome.yourlure.repositories.*;
import fpt.custome.yourlure.service.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.persistence.Query;
import javax.transaction.Transactional;
import javax.validation.ValidationException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductJpaRepos productJPARepos;

    @Autowired
    AdminProductController adminProductController;

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
    public Object getAll(String keyword, Pageable pageable) {
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
        Optional<Product> findProduct = productJPARepos.findById(id);
        if (findProduct == null) {
            throw new ValidationException("Mã sản phẩm không tồn tại");
        }
        return findProduct.map(product -> mapper.map(product, ProductsDetailDtoOut.class)).orElse(null);

    }

    @Override
    public Object getBestSeller() {
        List<ProductsDtoOut> results = new ArrayList<>();
        List<Product> list = productJPARepos.bestSellerProduct();
        for (Product item : list) {
            ProductsDtoOut dtoOut = mapper.map(item, ProductsDtoOut.class);
            results.add(dtoOut);
        }
        return results;
    }

    @Override
    public Float validateWeight(Product product, Float weight) {
        if (product.getIsCustomizeWeight() != null && product.getIsCustomizeWeight()
                && product.getMinWeight() != null && product.getMaxWeight() != null) {
            if (weight <= product.getMaxWeight() && weight >= product.getMinWeight()) {
                return weight;
            }
            throw new ValidationException("Vui lòng nhập trọng lượng trong khoảng " + product.getMinWeight() + "-" + product.getMaxWeight());
        }
        return product.getDefaultWeight();
    }

    @Override
    public Float validateWeight(Long productId, Float weight) {
        Optional<Product> product = productJPARepos.findById(productId);
        return product.map(value -> validateWeight(value, weight)).orElseThrow(() -> new ValidationException("Không tìm thấy sản phẩm xin thử lại!"));
    }

    @Override
    public List<ProductsDtoOut> getNewestProduct() {
        List<ProductsDtoOut> result = new ArrayList<>();
        Pageable pageable = PageRequest.of(0,
                10,
                Sort.by("dateCreate").descending());
        List<Product> list = productJPARepos.findAllByVisibleInStorefront(true, pageable).getContent();
        for (Product item : list) {
            ProductsDtoOut dtoOut = mapper.map(item, ProductsDtoOut.class);
            result.add(dtoOut);
        }
        return result;
    }

    @Override
    public Object getProductFilter(Filter filter, Boolean isAdmin) {
        Query query = productRepos.getProductFilter(filter);
        int totalProduct = query.getResultList().size();
        query.setFirstResult(filter.getLimit() * filter.getPage());
        query.setMaxResults(filter.getLimit());
        List<Product> list = query.getResultList();
        if (!isAdmin) {
            List<ProductsFilterDtoOut.ProductOut> productOutList = new ArrayList<>();
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
        } else {
            int numberOfProduct = 0;
            List<AdminProductDtoOut.ProductOutput> listResult = new ArrayList<>();
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
                    .totalProduct(totalProduct)
                    .totalPage((int) Math.ceil((double) totalProduct / filter.getLimit()))
                    .build();
            return Optional.of(results);
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
    public Object updateProduct(ProductsDtoInp productsDtoInp, Long id) {

        if (id != null && productsDtoInp != null) {
            Product productToUpdate = productJPARepos.getById(id);
            if (productToUpdate != null) {
                productToUpdate.update(productsDtoInp);
                productToUpdate.setCategory(categoryRepos.getById(productsDtoInp.getCategoryId()));
                //update properties product
                //add image
                if (!productsDtoInp.getImgListInput().isEmpty())
                    for (String link : productsDtoInp.getImgListInput()) {
                        Image image = Image.builder()
                                .product(Product.builder().productId(id).build())
                                .linkImage(link)
                                .build();
                        productToUpdate.getImageCollection().add(image);
                    }

                //remove image
                if (!productsDtoInp.getImgListRemove().isEmpty()) {
                    for (String imgRemove : productsDtoInp.getImgListRemove()) {
                        imageRepos.deleteByLinkImage(imgRemove);
//                            productToUpdate.getImageCollection().remove(Image.builder().linkImage(imgRemove).build());
                    }
                    adminProductController.deleteFiles(productsDtoInp.getImgListRemove());
                }

                Product product = productJPARepos.save(productToUpdate);

                //update fish

                //clear product in fish_product
                for (Fish fish : fishRepos.findAll()) {
                    fish.removeProduct(product);
                    fishRepos.save(fish);
                }
                //add to fish_product (update)
                if (productsDtoInp.getListFishId() != null) {
                    for (Long fishId : productsDtoInp.getListFishId()) {
                        Fish fishInput = fishRepos.getById(fishId);
                        fishInput.addProduct(product);
                        fishRepos.save(fishInput);
                    }
                }
                return "Cập nhật sản phẩm thành công!";
            } else {
                throw new ValidationException("Mã Sản Phẩm cập nhật không tồn tại!");
            }
        } else {
            throw new ValidationException("Mã Sản Phẩm cập nhật không được null!");
        }

    }

    @Transactional
    @Override
    public Long save(ProductsDtoInp productsDtoInp) {
        Product product;
        Long idReturn;

        if (productsDtoInp != null) {
            //save product
            product = mapper.map(productsDtoInp, Product.class);
            Optional<Category> categoryInput = categoryRepos.findById(productsDtoInp.getCategoryId());
            product.setCategory(categoryInput.get());
            product.setDateCreate(new Date());
            Product productToSaveImage = productJPARepos.save(product);
            idReturn = productToSaveImage.getProductId();
            //add list image product
            List<String> imageLink = productsDtoInp.getImgListInput();
            if (imageLink != null)
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
            throw new ValidationException("Data input không được null!");
        }
    }

    @Override
    public AdminProductDetailDtoOut adminGetById(Long id) {
        Optional<Product> findProduct = productJPARepos.findById(id);
        AdminProductDetailDtoOut result = findProduct.map(product -> mapper.map(product, AdminProductDetailDtoOut.class)).orElse(null);
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

    @Override
    public Object remove(Long id) {
        if (id == null) {
            throw new ValidationException("Vui lòng chọn sản phẩm để xoá!");
        }
        Product product = productJPARepos.findById(id).orElse(null);
        if (product == null) {
            throw new ValidationException("Sản phẩm không tồn tại!");
        }
        if (product.getVisibleInStorefront()) {
            throw new ValidationException("Sản phẩm đang được bày bán, không thể xoá!");
        }
        if (orderLineRepos.findByProductIdOrVariantId(id) != null) {
            throw new ValidationException("Sản phẩm đã được khách hàng mua nên không thể xóa!");
        }
        if (product.getCustomizable() && product.getModel3d().getCustomizeModels().size() > 0) {
            throw new ValidationException("Sản phẩm này đã có người tuỳ biến, không thể xoá!");
        }
        productJPARepos.delete(product);
        return true;
    }

    @Override
    public Boolean block(Long id) {
        try {
            if (id != null) {
                Product productToUpdate = productJPARepos.getById(id);
                if (productToUpdate != null) {
                    productToUpdate.setVisibleInStorefront(!productToUpdate.getVisibleInStorefront());
                    return true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }


}
