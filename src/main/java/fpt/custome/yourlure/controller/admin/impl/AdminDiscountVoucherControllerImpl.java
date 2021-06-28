package fpt.custome.yourlure.controller.admin.impl;

import fpt.custome.yourlure.controller.admin.AdminDiscountVoucherController;
import fpt.custome.yourlure.dto.dtoInp.AdminDiscountVoucherDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminDiscountVoucherDtoOut;
import fpt.custome.yourlure.entity.Filter;
import fpt.custome.yourlure.service.DiscountVoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class AdminDiscountVoucherControllerImpl implements AdminDiscountVoucherController {

    @Autowired
    private DiscountVoucherService discountVoucherService;

    @Override
    public ResponseEntity<Optional<AdminDiscountVoucherDtoOut>> findAll(Filter filter) {
        Optional<AdminDiscountVoucherDtoOut> result = discountVoucherService.searchAll(filter.getKeyword()
                , PageRequest.of(filter.getPage(),
                        filter.getLimit(),
                        filter.getIsAsc() ? Sort.by(filter.getSortBy()).ascending() : Sort.by(filter.getSortBy()).descending()));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> save(AdminDiscountVoucherDtoInput discountVoucherDtoInput) {
        Boolean result = discountVoucherService.saveVoucher(discountVoucherDtoInput);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> update(Long id, AdminDiscountVoucherDtoInput discountVoucherDtoInput) {
        Boolean result = discountVoucherService.updateVoucher(discountVoucherDtoInput, id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> delete(Long id) {
        Boolean result = discountVoucherService.removeVoucher(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
