package fpt.custome.yourlure.controller.admin;

import fpt.custome.yourlure.dto.dtoInp.AdminFilterDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminOrderDetailDtoOut;
import fpt.custome.yourlure.dto.dtoOut.AdminOrderDtoOut;
import fpt.custome.yourlure.entity.Filter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RequestMapping("/admin/order")

public interface AdminOrderController {

    /**
     * tích hợp all and search
     *
     * @param adminFilterDtoInput
     * @return
     */
    @PostMapping("/all-by-phone-or-name")
    ResponseEntity<Optional<AdminOrderDtoOut>> findAll(@RequestBody @Valid AdminFilterDtoInput adminFilterDtoInput);

//    /**
//     * tìm kiếm order theo điện thoại
//     * @param filter
//     * @return
//     */
//    @PostMapping("/search")
//    List<Order> search(@RequestBody Filter filter);

    /**
     * chi tiet 1 order cua user
     *
     * @param userId
     * @return
     */
    @GetMapping("/get-user-order-detail/{userId}")
    ResponseEntity<Optional<AdminOrderDetailDtoOut>> getUserOrder(@PathVariable("userId") Long userId);

    /**
     * xem chi tiết order
     *
     * @param id
     * @return
     */
    @GetMapping("/order-detail/{id}")
    ResponseEntity<Optional<AdminOrderDetailDtoOut>> getOrderById(@PathVariable("id") Long id);

    /**
     * danh sach order cua user
     *
     * @param filter
     * @return
     */
    @PostMapping("/user-orders")
    ResponseEntity<Optional<AdminOrderDtoOut>> getListOrderByUserId(@RequestBody Filter filter);

    /**
     * xóa order chỉ dành cho amdin
     *
     * @param id
     * @return
     */
    @DeleteMapping("/{id}")
    ResponseEntity<Boolean> deleteOrder(@PathVariable("id") Long id);

}
