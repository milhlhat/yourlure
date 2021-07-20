package fpt.custome.yourlure.controller.admin;

import fpt.custome.yourlure.dto.dtoInp.ProductsDtoInp;
import fpt.custome.yourlure.entity.Filter;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RequestMapping("/admin/product")
public interface AdminProductController {

    @PostMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Object> findAll(@RequestBody @Valid Filter filter);

    @PostMapping("/save")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Object> saveProduct(@RequestBody @Valid ProductsDtoInp productsDtoInp);

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Object> getProductById(@PathVariable("id") Long id);
//
//    @PostMapping("/find-by-name")
//    ResponseEntity<Optional<AdminProductDtoOut>> getProductByName(@RequestBody Filter filter);

    @PostMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Object> editProduct(@PathVariable("id") Long id, @RequestBody @Valid ProductsDtoInp productsDtoInp);

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Object> deleteProduct(@PathVariable("id") Long id);

    @DeleteMapping("/block/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Object> blockProduct(@PathVariable("id") Long id);

    @PostMapping(value = "/upload")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Object> uploadFile(@RequestParam("files") @Valid MultipartFile[] file) throws IOException;

    @GetMapping(value = "/delete-file")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Object> deleteFiles(@RequestParam List<String> urls);

}
