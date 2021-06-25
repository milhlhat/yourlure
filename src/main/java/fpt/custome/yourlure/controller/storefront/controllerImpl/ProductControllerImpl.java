package fpt.custome.yourlure.controller.storefront.controllerImpl;

import fpt.custome.yourlure.controller.storefront.ProductController;
import fpt.custome.yourlure.dto.dtoOut.ProductsDetailDtoOut;
import fpt.custome.yourlure.dto.dtoOut.ProductsDtoOut;
import fpt.custome.yourlure.dto.dtoOut.ProductsFilterDtoOut;
import fpt.custome.yourlure.entity.Filter;
import fpt.custome.yourlure.repositories.ProductRepos;
import fpt.custome.yourlure.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.List;
import java.util.Optional;


@RestController // This means that this class is a Controller
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProductControllerImpl implements ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepos productRepos;

//    @Override
//    public ResponseEntity<ProductOutPageable> getAll(Filter filter) {
//        ProductOutPageable result = new ProductOutPageable();
//        result.setPage(filter.getPage());
//        Pageable pageable = filter.getFilter();
//        result.setListResult(productService.getAll(pageable));
//        result.setTotalPage((int) Math.ceil((double) (productService.totalItem()) / filter.getLimit()));
//        return new ResponseEntity<>(result, HttpStatus.OK);
//    }

    @Override
    public ResponseEntity<Optional<ProductsDetailDtoOut>> getById(Long id) {
        ProductsDetailDtoOut dtoOut = productService.getById(id);
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

    @Override
    public ResponseEntity<Optional<ProductsFilterDtoOut>> getProductFilter(Filter filter) {
        Optional<ProductsFilterDtoOut> dtoOuts = productService.getProductFilter(filter);
        return new ResponseEntity<>(dtoOuts, HttpStatus.OK);
    }

//    @Override
//    public ResponseEntity<List<ProductsDtoOut>> getProductByName(Filter filter) {
//        List<ProductsDtoOut> dtoOuts = productService.findAllByProductName(filter.getKeyword(), PageRequest.of(filter.getPage(),
//                filter.getLimit(), filter.getIsAsc() ? Sort.by(filter.getSortBy()).ascending() : Sort.by(filter.getSortBy()).descending()));
//        return new ResponseEntity<>(dtoOuts, HttpStatus.OK);
//    }

    @Override
    public ResponseEntity<Resource> download(String path) {
        try{
            java.io.File file = ResourceUtils.getFile("classpath:" + path);
            InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

            return ResponseEntity.ok()
//                    .headers(headers)
//                    .contentLength(file.length())
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(resource);
        }catch (FileNotFoundException e) {
            e.printStackTrace();
            return ResponseEntity.notFound()
                    .build();
        }


    }
}
