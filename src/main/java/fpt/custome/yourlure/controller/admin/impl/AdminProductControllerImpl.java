package fpt.custome.yourlure.controller.admin.impl;

import fpt.custome.yourlure.controller.admin.AdminProductController;
import fpt.custome.yourlure.dto.dtoInp.ProductsDtoInp;
import fpt.custome.yourlure.dto.dtoOut.AdminProductDetailDtoOut;
import fpt.custome.yourlure.dto.dtoOut.AdminProductDtoOut;
import fpt.custome.yourlure.entity.Filter;
import fpt.custome.yourlure.service.FileService;
import fpt.custome.yourlure.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
public class AdminProductControllerImpl implements AdminProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private FileService fileService;

    @Override
    public ResponseEntity<Optional<AdminProductDtoOut>> findAll(Filter filter) {
        Pageable pageable = PageRequest.of(filter.getPage(),
                filter.getLimit(),
                filter.getIsAsc() ? Sort.by(filter.getSortBy()).ascending() : Sort.by(filter.getSortBy()).descending());

        Optional<AdminProductDtoOut> result = productService.getAll(filter.getKeyword(), pageable);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Long> saveProduct(ProductsDtoInp productsDtoInp) {
        Long result = productService.save(productsDtoInp);
        if (result == null) {
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Optional<AdminProductDetailDtoOut>> getProductById(Long id) {
        AdminProductDetailDtoOut dtoOut = productService.adminGetById(id);
        return new ResponseEntity<>(Optional.of(dtoOut), HttpStatus.OK);
    }

//    @Override
//    public ResponseEntity<Optional<AdminProductDtoOut>> getProductByName(Filter filter) {
//        Optional<AdminProductDtoOut> dtoOuts = productService.adminSearchProductName(filter.getKeyword(), PageRequest.of(filter.getPage(),
//                filter.getLimit(), filter.getIsAsc() ? Sort.by(filter.getSortBy()).ascending() : Sort.by(filter.getSortBy()).descending()));
//        return new ResponseEntity<>(dtoOuts, HttpStatus.OK);
//    }

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
    public ResponseEntity<Object> blockProduct(Long id) {
        Boolean check = productService.block(id);
        if (!check){
            return new ResponseEntity<>("Xóa ảnh không thành công", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Object> uploadFile(MultipartFile[] files) {
        List<String> result = fileService.saveMultipartFiles(files, FileService.UPLOADS);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Object> deleteFiles(List<String> urls) {
        List<String> fileFailDelete = new ArrayList<>();
        List<String> fileSuccessDelete = new ArrayList<>();
        for (String url : urls) {
            if (fileService.deleteFile(url)) {
                fileSuccessDelete.add(url);
            } else {
                fileFailDelete.add(url);
            }
        }
        HashMap<String, Object> result = new HashMap<>();

        // add elements dynamically
        result.put("fileDeleteSuccess", fileSuccessDelete);
        result.put("fileDeleteFail", fileFailDelete);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
