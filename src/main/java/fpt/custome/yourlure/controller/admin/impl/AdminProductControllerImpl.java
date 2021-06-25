package fpt.custome.yourlure.controller.admin.impl;

import fpt.custome.yourlure.controller.admin.AdminProductController;
import fpt.custome.yourlure.dto.dtoInp.ProductsDtoInp;
import fpt.custome.yourlure.dto.dtoOut.AdminProductDetailDtoOut;
import fpt.custome.yourlure.dto.dtoOut.AdminProductDtoOut;
import fpt.custome.yourlure.entity.Filter;
import fpt.custome.yourlure.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
public class AdminProductControllerImpl implements AdminProductController {

    @Autowired
    private ProductService productService;

    @Override
    public ResponseEntity<Optional<AdminProductDtoOut>> findAll(Filter filter) {
        Optional<AdminProductDtoOut> result = productService.getAll(PageRequest.of(filter.getPage(),
                filter.getLimit(), filter.getIsAsc() ? Sort.by(filter.getSortBy()).ascending() : Sort.by(filter.getSortBy()).descending()));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> saveProduct(ProductsDtoInp productsDtoInp) {
        Boolean check = productService.save(productsDtoInp);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Optional<AdminProductDetailDtoOut>> getProductById(Long id) {
        AdminProductDetailDtoOut dtoOut = productService.adminGetById(id);
        return new ResponseEntity<>(Optional.of(dtoOut), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Optional<AdminProductDtoOut>> getProductByName(Filter filter) {
        Optional<AdminProductDtoOut> dtoOuts = productService.adminSearchProductName(filter.getKeyword(), PageRequest.of(filter.getPage(),
                filter.getLimit(), filter.getIsAsc() ? Sort.by(filter.getSortBy()).ascending() : Sort.by(filter.getSortBy()).descending()));
        return new ResponseEntity<>(dtoOuts, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> editProduct(Long id, ProductsDtoInp productsDtoInp) {
        Boolean check = productService.updateProduct(productsDtoInp, id);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> deleteProduct(Long id) {
        Boolean check = productService.remove(id);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Object> uploadFile(List<MultipartFile> file) throws IOException {

//        File convertFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
//        boolean isCreated = convertFile.createNewFile();
//        if(isCreated){
//            try(FileOutputStream fout = new FileOutputStream(convertFile)){
//                fout.write(file.getBytes());
//            }
//        }
        return new ResponseEntity<>("file created", HttpStatus.OK);
    }
}
