package com.example.demo.Service.impl;

import com.example.demo.Service.impl.CategoryServiceImpl.ProductServiceImpl;
import com.example.demo.dto.dtoInp.ProductsDtoInp;
import com.example.demo.dto.dtoOut.CategoryDtoOut;
import com.example.demo.dto.dtoOut.ProductsDtoOut;
import com.example.demo.entity.Products;
import com.example.demo.repositories.ProductRepos;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
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
        List<Products> list = productRepos.findAll(pageable).getContent();
        for (Products item : list) {
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
    public Optional<ProductsDtoOut> getById(int id) {
        return Optional.empty();
    }

    @Override
    public List<ProductsDtoOut> getBestSeller() {
        return null;
    }

    @Override
    public List<ProductsDtoOut> getNewestProduct() {
        return null;
    }

    @Override
    public List<CategoryDtoOut> getBestSellerWithCategory() {
        return null;
    }

    @Override
    public List<ProductsDtoOut> getProductByCategory(List<Long> listCateId, List<Long> listFishId) {
        return null;
    }

    @Override
    public List<ProductsDtoOut> getProductByName(String product_name) {
        return null;
    }

    @Override
    public Boolean updateProduct(ProductsDtoInp productsDtoInp, Long id) {
        return null;
    }

    @Override
    public Boolean saveCate(ProductsDtoInp productsDtoInp) {
        return null;
    }

    @Override
    public Boolean removeCategory(Long id) {
        return null;
    }
}
