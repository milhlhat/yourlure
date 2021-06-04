package com.example.demo.controller;

import com.example.demo.controller.controllerInterface.ProductInterface;
import com.example.demo.dto.dtoInp.ProductsDtoInp;
import com.example.demo.dto.dtoOut.CategoryDtoOut;
import com.example.demo.dto.dtoOut.ProductsDtoOut;
import com.example.demo.entity.Category;
import com.example.demo.entity.Products;
import com.example.demo.repositories.CategoryRepos;
import com.example.demo.repositories.ProductRepos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController // This means that this class is a Controller
public class ProductController implements ProductInterface {

    @Autowired
    private ProductRepos productRepos;
    @Autowired
    private CategoryRepos categoryRepos;

    @PostMapping("/add-include")
    public String addProduct(@RequestBody Category category, Products product) {
//        try{
//            category = categoryRepos.save(category);
//            product.setCategoryId(category);
//            product = productRepos.save(product);
//            return "create product success with id " + product.getId();
//        }catch (Exception e){
//            return "fail";
//        }
        return null;
    }

    @Override
    public ResponseEntity<List<ProductsDtoOut>> getAll(int page, int limit) {
        return null;
    }

    @Override
    public ResponseEntity<Optional<ProductsDtoOut>> getById(int id) {
        return null;
    }

    @Override
    public ResponseEntity<List<ProductsDtoOut>> getBestSeller() {
        return null;
    }

    @Override
    public ResponseEntity<List<ProductsDtoOut>> getNewestProduct() {
        return null;
    }

    @Override
    public ResponseEntity<List<CategoryDtoOut>> getBestSellerWithCategory() {
        return null;
    }

    @Override
    public ResponseEntity<List<ProductsDtoOut>> getProductByCategory(List<Long> listCateId, List<Long> listFishId) {
        return null;
    }

    @Override
    public ResponseEntity<List<ProductsDtoOut>> getProductByName(String product_name) {
        return null;
    }

    @Override
    public ResponseEntity<Boolean> updateProduct(ProductsDtoInp productsDtoInp, Long id) {
        //        try {
//            productRepos.deleteById(product.getId());
//            productRepos.save(product);
//        } catch (Exception e) {
//            return "fail";
//        }
        return null;
    }

    @Override
    public ResponseEntity<Boolean> saveCate(ProductsDtoInp productsDtoInp) {
        return null;
    }

    @Override
    public ResponseEntity<Boolean> removeCategory(Long id) {
        //        try{
//            Products product = productRepos.findById(id).get();
//            product.setStatus(false);
//            return "success";
//        }catch (Exception e){
//            return "fail";
//        }
        return null;
    }
}
