package com.example.demo.controller;

import com.example.demo.Service.impl.CategoryServiceImpl.ProductServiceImpl;
import com.example.demo.controller.controllerInterface.ProductControllerImpl;
import com.example.demo.dto.dtoInp.ProductsDtoInp;
import com.example.demo.dto.dtoOut.ProductOutPageable;
import com.example.demo.dto.dtoOut.ProductsDtoOut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController // This means that this class is a Controller
public class ProductController implements ProductControllerImpl {

    @Autowired
    ProductServiceImpl productService;

    @Override
    public ResponseEntity<ProductOutPageable> getAll(int page, int limit) {
        ProductOutPageable result = new ProductOutPageable();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit, Sort.unsorted());
        result.setListResult(productService.getAll(pageable));
        result.setTotalPage((int) Math.ceil((double) (productService.totalItem()) / limit));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Optional<ProductsDtoOut>> getById(Long id) {
        ProductsDtoOut dtoOut = productService.getById(id);
        return new ResponseEntity<>(Optional.of(dtoOut), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<ProductsDtoOut>> getBestSeller() {
        List<ProductsDtoOut> dtoOuts = productService.getBestSeller();
        return new ResponseEntity<>(dtoOuts, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<ProductsDtoOut>> getNewestProduct() {
        List<ProductsDtoOut> dtoOuts = productService.getNewestProduct();
        return new ResponseEntity<>(dtoOuts, HttpStatus.OK);
    }

    //TODO: chưa phân trang
    @Override
    public ResponseEntity<List<ProductsDtoOut>> getProductByCategoryAndFish(List<Long> listCateId, List<Long> listFishId, int page, int limit) {
        List<ProductsDtoOut> dtoOuts = productService.getProductByCategoryAndFish(listCateId, listFishId);
        return new ResponseEntity<>(dtoOuts, HttpStatus.OK);
    }

    //TODO: chưa phân trang
    @Override
    public ResponseEntity<List<ProductsDtoOut>> getProductByName(String product_name, int page, int limit) {
        List<ProductsDtoOut> dtoOuts = productService.getProductByName(product_name);
        return new ResponseEntity<>(dtoOuts, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> updateProduct(ProductsDtoInp productsDtoInp, Long id) {
        Boolean check = productService.updateProduct(productsDtoInp, id);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> saveCate(ProductsDtoInp productsDtoInp) {
        Boolean check = productService.save(productsDtoInp);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> removeCategory(Long id) {
        Boolean check = productService.remove(id);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }
}
