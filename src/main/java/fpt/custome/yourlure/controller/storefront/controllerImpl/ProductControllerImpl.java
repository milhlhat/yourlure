package fpt.custome.yourlure.controller.storefront.controllerImpl;

import fpt.custome.yourlure.controller.storefront.ProductController;
import fpt.custome.yourlure.entity.Filter;
import fpt.custome.yourlure.service.ProductService;
import fpt.custome.yourlure.dto.dtoInp.ProductsDtoInp;
import fpt.custome.yourlure.dto.dtoOut.ProductsDtoOut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController // This means that this class is a Controller
public class ProductControllerImpl implements ProductController {

    @Autowired
    private ProductService productService;

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
    public ResponseEntity<Optional<ProductsDtoOut>> getById(Long id) {
        ProductsDtoOut dtoOut = productService.getById(id);
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

    //TODO: chưa phân trang
    @Override
    public ResponseEntity<List<ProductsDtoOut>> getProductByCategoryAndFish(List<Long> listCateId, List<Long> listFishId, int page, int limit) {
        List<ProductsDtoOut> dtoOuts = productService.getProductByCategoryAndFish(listCateId, listFishId);
        return new ResponseEntity<>(dtoOuts, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<ProductsDtoOut>> getProductByName(Filter filter) {
        List<ProductsDtoOut> dtoOuts = productService.findAllByProductName(filter.getKeyword(), PageRequest.of(filter.getPage(),
                filter.getLimit(), filter.getIsAsc()? Sort.by(filter.getSortBy()).ascending(): Sort.by(filter.getSortBy()).descending()));
        return new ResponseEntity<>(dtoOuts, HttpStatus.OK);
    }


    @Override
    public ResponseEntity<Boolean> updateProduct(ProductsDtoInp productsDtoInp, Long id) {
        Boolean check = productService.updateProduct(productsDtoInp, id);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> saveCate(ProductsDtoInp productsDtoInp) {
        Boolean check = productService.save(productsDtoInp);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> removeCategory(Long id) {
        Boolean check = productService.remove(id);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }
}
