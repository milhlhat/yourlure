package fpt.custome.yourlure.controller.storefront;

import fpt.custome.yourlure.dto.dtoOut.ProductsDetailDtoOut;
import fpt.custome.yourlure.dto.dtoOut.ProductsDtoOut;
import fpt.custome.yourlure.dto.dtoOut.ProductsFilterDtoOut;
import fpt.custome.yourlure.entity.Filter;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RequestMapping(path = "/api/product")
public interface ProductController {

//    @PostMapping("/all")
//    ResponseEntity<ProductOutPageable> getAll(@RequestParam(value = "page") Filter filter);

    @GetMapping("/{id}")
    ResponseEntity<Optional<ProductsDetailDtoOut>> getById(@PathVariable Long id);

    @GetMapping("/best-seller")
    ResponseEntity<List<ProductsDtoOut>> getBestSeller();

    @GetMapping("/newest")
    ResponseEntity<List<ProductsDtoOut>> getNewestProduct();

    @PostMapping("/product-filter")
    ResponseEntity<Optional<ProductsFilterDtoOut>> getProductFilter(@RequestBody Filter filter);

//    @PostMapping("/find-by-name")
//    ResponseEntity<List<ProductsDtoOut>> getProductByName(@RequestBody Filter filter);

    //TODO: getmapping customize

    @GetMapping("/download")
    ResponseEntity<Resource> download(String path);

    @GetMapping("/get-file-base64")
    ResponseEntity<Object> downloadBase64(String path);

}
