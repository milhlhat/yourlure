package com.example.demo.controller.admin.impl;

import com.example.demo.controller.admin.AdminProductController;
import com.example.demo.entity.Product;
import com.example.demo.repositories.ProductRepos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
public class AdminAdminProductControllerImpl implements AdminProductController {

    @Autowired
    private ProductRepos productRepos;

    @Override
    public ResponseEntity<List<Product>> findAll() {
        return new ResponseEntity<>(productRepos.findAll(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> addProduct(Product product) {
        return null;
    }

    @Override
    public ResponseEntity<Optional<Product>> getProductById(Long id) {
        return null;
    }

    @Override
    public ResponseEntity<Product> editProduct(Long id, Product product) {
        return null;
    }

    @Override
    public ResponseEntity<Boolean> deleteProduct(Long id) {
        return null;
    }

    @Override
    public ResponseEntity<Object> uploadFile(MultipartFile file) throws IOException {
        File convertFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        boolean isCreated = convertFile.createNewFile();
        if(isCreated){
            try(FileOutputStream fout = new FileOutputStream(convertFile)){
                fout.write(file.getBytes());
            }
        }
        return new ResponseEntity<>("file created", HttpStatus.OK);
    }
}
