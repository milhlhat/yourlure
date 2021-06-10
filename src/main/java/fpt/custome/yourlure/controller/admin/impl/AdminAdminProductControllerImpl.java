package fpt.custome.yourlure.controller.admin.impl;

import fpt.custome.yourlure.controller.admin.AdminProductController;
import fpt.custome.yourlure.entity.Product;
import fpt.custome.yourlure.repositories.ProductJPARepos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
public class AdminAdminProductControllerImpl implements AdminProductController {

    @Autowired
    private ProductJPARepos productRepos;

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
    public ResponseEntity<Object> uploadFile(MultipartFile[] file) throws IOException {
//        for (MultipartFile item: file){
//            File convertFile = new File(Objects.requireNonNull(item.getOriginalFilename()));
//            boolean isCreated = convertFile.createNewFile();
//            if(isCreated){
//                try(FileOutputStream fout = new FileOutputStream(convertFile)){
//                    fout.write(file.getBytes());
//                }
//            }
//        }
        return new ResponseEntity<>("file created", HttpStatus.OK);
    }
}
