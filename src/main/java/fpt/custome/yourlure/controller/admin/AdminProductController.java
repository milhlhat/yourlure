package fpt.custome.yourlure.controller.admin;

import fpt.custome.yourlure.dto.dtoInp.ProductsDtoInp;
import fpt.custome.yourlure.dto.dtoOut.AdminProductDetailDtoOut;
import fpt.custome.yourlure.dto.dtoOut.AdminProductDtoOut;
import fpt.custome.yourlure.entity.Filter;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RequestMapping("/admin/product")
public interface AdminProductController {

    @PostMapping("/all")
    ResponseEntity<Optional<AdminProductDtoOut>> findAll(@RequestBody Filter filter);

    @PostMapping("/save")
    ResponseEntity<Boolean> saveProduct(@RequestBody ProductsDtoInp productsDtoInp);

    @GetMapping("/{id}")
    ResponseEntity<Optional<AdminProductDetailDtoOut>> getProductById(@PathVariable("id") Long id);
//
//    @PostMapping("/find-by-name")
//    ResponseEntity<Optional<AdminProductDtoOut>> getProductByName(@RequestBody Filter filter);

    @PostMapping("/{id}")
    ResponseEntity<Boolean> editProduct(@PathVariable("id") Long id, @RequestBody @Validated ProductsDtoInp productsDtoInp);

    @DeleteMapping("/{id}")
    ResponseEntity<Boolean> deleteProduct(@PathVariable("id") Long id);

    @PostMapping(value = "/upload")
    ResponseEntity<Object> uploadFile(@RequestParam("files") MultipartFile[] file) throws IOException;

    @GetMapping(value = "/delete-file")
    ResponseEntity<Object> deleteFiles(@RequestParam List<String> urls);

}
