package fpt.custome.yourlure.controller.storefront.controllerImpl;

import fpt.custome.yourlure.controller.storefront.ProductController;
import fpt.custome.yourlure.dto.dtoOut.ProductsDetailDtoOut;
import fpt.custome.yourlure.dto.dtoOut.ProductsDtoOut;
import fpt.custome.yourlure.dto.dtoOut.ProductsFilterDtoOut;
import fpt.custome.yourlure.entity.Filter;
import fpt.custome.yourlure.service.FileService;
import fpt.custome.yourlure.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;


@RestController // This means that this class is a Controller
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProductControllerImpl implements ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private FileService fileService;

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

    Resource loadFileAsResource(String fileName) {
        try {
            Path fileStorageLocation = null;
            Path filePath = fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {
                System.out.println("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            System.out.println("File not found " + fileName);
        }
        return null;
    }

    public ResponseEntity<Resource> download2(@PathVariable String fileName, HttpServletRequest request) {
        // Load file as Resource
        Resource resource = loadFileAsResource(fileName);


        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            System.out.println("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @Override
    public ResponseEntity<Object> downloadBase64(String path) {
        return new ResponseEntity<>(fileService.getFileBase64(path), HttpStatus.OK);
    }

}