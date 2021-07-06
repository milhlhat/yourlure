package fpt.custome.yourlure.controller.admin.impl;

import fpt.custome.yourlure.controller.admin.AdminOrderController;
import fpt.custome.yourlure.dto.dtoInp.AdminFilterDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminOrderDetailDtoOut;
import fpt.custome.yourlure.dto.dtoOut.AdminOrderDtoOut;
import fpt.custome.yourlure.entity.Filter;
import fpt.custome.yourlure.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class AdminOrderControllerImpl implements AdminOrderController {

    @Autowired
    private OrderService orderService;

    @Override
    public ResponseEntity<Optional<AdminOrderDtoOut>> findAll(AdminFilterDtoInput filter) {
        Optional<AdminOrderDtoOut> result = orderService.getAll(filter.getKeyword(), filter.getTypeSearch(),PageRequest.of(filter.getPage(),
                filter.getLimit(), filter.getIsAsc() ? Sort.by(filter.getSortBy()).ascending() : Sort.by(filter.getSortBy()).descending()));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Optional<AdminOrderDetailDtoOut>> getUserOrder(Long userId) {
        Optional<AdminOrderDetailDtoOut> result = orderService.getById(userId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Optional<AdminOrderDetailDtoOut>> getOrderById(Long id) {
        Optional<AdminOrderDetailDtoOut> result = orderService.getById(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Optional<AdminOrderDtoOut>> getOrderByUserId(Filter filter) {
        Optional<AdminOrderDtoOut> result = orderService.getOrderByUserId(Long.parseLong(filter.getKeyword().trim()), PageRequest.of(filter.getPage(),
                filter.getLimit(), filter.getIsAsc() ? Sort.by(filter.getSortBy()).ascending() : Sort.by(filter.getSortBy()).descending()));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> deleteOrder(Long id) {
        Boolean result = orderService.remove(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
