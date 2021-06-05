package com.example.demo.controller;

import com.example.demo.Service.impl.CategoryServiceImpl.ProductServiceImpl;
import com.example.demo.controller.controllerInterface.ProductControllerImpl;
import com.example.demo.dto.dtoInp.ProductsDtoInp;
import com.example.demo.dto.dtoOut.CategoryDtoOut;
import com.example.demo.dto.dtoOut.ProductOutPageable;
import com.example.demo.dto.dtoOut.ProductsDtoOut;
import com.example.demo.entity.Category;
import com.example.demo.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController // This means that this class is a Controller
public class ProductController implements ProductControllerImpl {

    @Autowired
    ProductServiceImpl productService;

    @PostMapping("/add-include")
    public String addProduct(@RequestBody Category category, Product product) {
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
    public ResponseEntity<ProductOutPageable> getAll(int page, int limit) {
//        ProductOutPageable result = ProductOutPageable.builder()
//                .page(page)
//                .build();
//        Pageable pageable = new PageRequest.of(0, page - 1, limit);
//        result.setListResult(productService.getAll(pageable));
//        result.setTotalPage((int) Math.ceil((double) (productService.totalItem()) / limit));

//        return new ResponseEntity<>(result, HttpStatus.OK);
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
