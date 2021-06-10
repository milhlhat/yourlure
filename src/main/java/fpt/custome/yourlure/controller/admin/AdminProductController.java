package fpt.custome.yourlure.controller.admin;

import fpt.custome.yourlure.entity.Product;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RequestMapping("/admin/product")
public interface AdminProductController {

    @GetMapping("/all")
    ResponseEntity<List<Product>> findAll();

    @PostMapping("/add")
    ResponseEntity<Boolean> addProduct(@RequestBody Product product);

    @GetMapping("/{id}")
    ResponseEntity<Optional<Product>> getProductById(@PathVariable("id") Long id);

    @PostMapping("/{id}")
    ResponseEntity<Product> editProduct(@PathVariable("id") Long id, @RequestBody @Validated Product product);

    @DeleteMapping("/{id}")
    ResponseEntity<Boolean> deleteProduct(@PathVariable("id") Long id);

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ResponseEntity<Object> uploadFile(@RequestParam("file") @Validated MultipartFile[] file) throws IOException;
}
