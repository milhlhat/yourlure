package fpt.custome.yourlure.controller.storefront;

import fpt.custome.yourlure.dto.dtoOut.ProductsDtoOut;
import fpt.custome.yourlure.dto.dtoOut.ProductsFilterDtoOut;
import fpt.custome.yourlure.entity.Filter;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;


@RequestMapping(path = "/api/product")
public interface ProductController {

//    @PostMapping("/all")
//    ResponseEntity<ProductOutPageable> getAll(@RequestParam(value = "page") Filter filter);

    @GetMapping("/{id}")
    ResponseEntity<Object> getById(@PathVariable Long id);

    @GetMapping("/best-seller")
    ResponseEntity<Object> getBestSeller();

    @GetMapping("/newest")
    ResponseEntity<List<ProductsDtoOut>> getNewestProduct();

    @PostMapping("/product-filter")
    ResponseEntity<Object> getProductFilter(@RequestBody Filter filter);

    @GetMapping("/download")
    ResponseEntity<Resource> download(String path);

    @GetMapping("/downloadFile/{fileName:.+}")
    ResponseEntity<Resource> download2(@PathVariable String fileName, HttpServletRequest rq);

    @GetMapping("/get-file-base64")
    ResponseEntity<Object> downloadBase64(String path);


}
