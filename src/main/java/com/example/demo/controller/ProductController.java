package com.example.demo.controller;

import com.example.demo.entity.Category;
import com.example.demo.entity.Products;
import com.example.demo.repositories.CategoryRepos;
import com.example.demo.repositories.ProductRepos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // This means that this class is a Controller
@RequestMapping(path = "/product")
public class ProductController {

    @Autowired
    private ProductRepos productRepos;
    @Autowired
    private CategoryRepos categoryRepos;

    @GetMapping("/all")
    public List<Products> findAll() {
        return (List<Products>) productRepos.findAll();
    }

    @PostMapping("/add")
    public String addProduct(@RequestBody Products product) {
//        try{
//            System.out.println("adding product: " +product.toString());
//            product.setCreateAt(new Date());
//            product.setLastEdit(new Date());
//            productRepos.save(product);
//        }catch (Exception e){
//            System.out.println(e);
//            return "fail";
//        }
        return "success";
    }


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


    @DeleteMapping("/delete")
    public String deleteProduct(Long id) {
//        try{
//            Products product = productRepos.findById(id).get();
//            product.setStatus(false);
//            return "success";
//        }catch (Exception e){
//            return "fail";
//        }
        return "success";
    }


    @PostMapping("/edit")
    public String editProduct(Products product) {
//        try {
//            productRepos.deleteById(product.getId());
//            productRepos.save(product);
//        } catch (Exception e) {
//            return "fail";
//        }
        return "success";
    }

}
