package fpt.custome.yourlure.controller.admin.impl;

import fpt.custome.yourlure.controller.admin.AdminOrderController;
import fpt.custome.yourlure.dto.dtoInp.AdminFilterDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminOrderDtoOut;
import fpt.custome.yourlure.dto.dtoOut.OrderDtoOut;
import fpt.custome.yourlure.entity.Filter;
import fpt.custome.yourlure.entity.OrderActivityEnum;
import fpt.custome.yourlure.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ValidationException;
import java.util.Optional;

@RestController
public class AdminOrderControllerImpl implements AdminOrderController {

    @Autowired
    private OrderService orderService;

    @Override
    public ResponseEntity<Object> findAll(AdminFilterDtoInput filter) {
        Optional<AdminOrderDtoOut> result = orderService.getAll(filter.getKeyword(), filter.getTypeSearch(), PageRequest.of(filter.getPage(),
                filter.getLimit(), filter.getIsAsc() ? Sort.by(filter.getSortBy()).ascending() : Sort.by(filter.getSortBy()).descending()));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Object> getUserOrder(Long userId) {
        OrderDtoOut.Order result = orderService.orderDetail(userId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Object> getOrderById(Long id) {
        try {
            OrderDtoOut.Order result = orderService.orderDetail(id);
            return new ResponseEntity<>(result, HttpStatus.OK);

        } catch (ValidationException validationException) {
            System.out.println(validationException.getMessage());
            return new ResponseEntity<>(validationException.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Lỗi hệ thống!", HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @Override
    public ResponseEntity<Object> getListOrderByUserId(Filter filter) {
        Optional<AdminOrderDtoOut> result = orderService.getOrderByUserId(Long.parseLong(filter.getKeyword().trim()), PageRequest.of(filter.getPage(),
                filter.getLimit(), filter.getIsAsc() ? Sort.by(filter.getSortBy()).ascending() : Sort.by(filter.getSortBy()).descending()));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> deleteOrder(Long id) {
        Boolean result = orderService.remove(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Object> updateStatusOrder(HttpServletRequest req, OrderActivityEnum activityEnum, Long orderId) {
        try {
            return new ResponseEntity<>(orderService.updateOrderActivity(req, activityEnum, orderId), HttpStatus.OK);
        } catch (ValidationException validationException) {
            System.out.println(validationException.getMessage());
            return new ResponseEntity<>(validationException.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Lỗi hệ thống!", HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
