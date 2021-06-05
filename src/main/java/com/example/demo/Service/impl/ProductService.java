package com.example.demo.Service.impl;

import com.example.demo.Service.impl.CategoryServiceImpl.ProductServiceImpl;
import com.example.demo.dto.dtoInp.ProductsDtoInp;
import com.example.demo.dto.dtoOut.ProductsDtoOut;
import com.example.demo.entity.Product;
import com.example.demo.repositories.ProductRepos;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService implements ProductServiceImpl {

    @Autowired
    ProductRepos productRepos;

    // Tạo mapper object
    ModelMapper mapper = new ModelMapper();

    @Override
    public List<ProductsDtoOut> getAll(Pageable pageable) {

        List<ProductsDtoOut> results = new ArrayList<>();
        List<Product> list = productRepos.findAll(pageable).getContent();
        for (Product item : list) {
            ProductsDtoOut dtoOut = mapper.map(item, ProductsDtoOut.class);
            results.add(dtoOut);
        }
        return results;
    }

    @Override
    public int totalItem() {
        return (int) productRepos.count();
    }


    @Override
    public ProductsDtoOut getById(Long id) {
        Optional<Product> findProduct = productRepos.findById(id);
        return findProduct.map(product -> mapper.map(product, ProductsDtoOut.class)).orElse(null);
    }

    @Override
    public List<ProductsDtoOut> getBestSeller() {
        List<ProductsDtoOut> results = new ArrayList<>();
        List<Product> list = productRepos.bestSellerProduct();
        for (Product item : list) {
            ProductsDtoOut dtoOut = mapper.map(item, ProductsDtoOut.class);
            results.add(dtoOut);
        }
        return results;
    }

    @Override
    public List<ProductsDtoOut> getNewestProduct() {
        List<ProductsDtoOut> result = new ArrayList<>();
        List<Product> list = productRepos.findAll(Sort.by(Sort.Direction.DESC, "dateCreate"));
        for (Product item : list) {
            ProductsDtoOut dtoOut = mapper.map(item, ProductsDtoOut.class);
            result.add(dtoOut);
        }
        return result;
    }

    @Override
    public List<ProductsDtoOut> getProductByCategoryAndFish(List<Long> listCateId, List<Long> listFishId) {
        List<ProductsDtoOut> result = new ArrayList<>();
        List<Product> list = productRepos.getProductByCategory(listCateId, listFishId);
        for (Product item : list) {
            ProductsDtoOut dtoOut = mapper.map(item, ProductsDtoOut.class);
            result.add(dtoOut);
        }
        return result;
    }

    @Override
    public List<ProductsDtoOut> getProductByName(String product_name) {
        List<ProductsDtoOut> result = new ArrayList<>();
        List<Product> list = productRepos.findProductByProductName(product_name);
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
                if (productRepos.findById(id).isPresent()) {
                    Product productToUpdate = mapper.map(productsDtoInp, Product.class);
                    productToUpdate.setProductID(id);
                    productRepos.save(productToUpdate);
                } else {
                    return false;
                }
            }
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return true;
    }

    @Override
    public Boolean save(ProductsDtoInp productsDtoInp) {
        try {
            Product product;
            if (productsDtoInp != null) {
                product = mapper.map(productsDtoInp, Product.class);
                productRepos.save(product);
            } else {
                return false;
            }
        } catch (
                Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public Boolean remove(Long id) {
        try {
            productRepos.deleteById(id);
        } catch (
                Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return false;
        }
        return true;
    }


}
