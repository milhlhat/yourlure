package fpt.custome.yourlure.controller.admin;

import fpt.custome.yourlure.dto.dtoOut.AdminOrderDetailDtoOut;
import fpt.custome.yourlure.dto.dtoOut.AdminOrderDtoOut;
import fpt.custome.yourlure.entity.Filter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RequestMapping("/admin/order")
public interface AdminOrderController {

    /**
     * tích hợp all and search
     *
     * @param filter
     * @return
     */
    @PostMapping("/all-by-phone-or-name")
    ResponseEntity<Optional<AdminOrderDtoOut>> findAll(@RequestBody Filter filter);

//    /**
//     * tìm kiếm order theo điện thoại
//     * @param filter
//     * @return
//     */
//    @PostMapping("/search")
//    List<Order> search(@RequestBody Filter filter);

    /**
     * lấy  order gần nhất của user
     *
     * @param userId
     * @return
     */
    @GetMapping("/get-user-order/{userId}")
    ResponseEntity<Optional<AdminOrderDetailDtoOut>> getUserOrder(@PathVariable("userId") Long userId);

    /**
     * xem chi tiết order
     *
     * @param id
     * @return
     */
    @GetMapping("/{id}")
    ResponseEntity<Optional<AdminOrderDetailDtoOut>> getOrderById(@PathVariable("id") Long id);

    /**
     * xem chi tiết order
     *
     * @param filter
     * @return
     */
    @PostMapping("/{userId}")
    ResponseEntity<Optional<AdminOrderDtoOut>> getOrderByUserId(@RequestBody Filter filter);

    /**
     * xóa order chỉ dành cho amdin
     *
     * @param id
     * @return
     */
    @DeleteMapping("/{id}")
    ResponseEntity<Boolean> deleteOrder(@PathVariable("id") Long id);

}
