package fpt.custome.yourlure.controller.admin;

import fpt.custome.yourlure.dto.dtoInp.AdminFilterDtoInput;
import fpt.custome.yourlure.entity.Filter;
import fpt.custome.yourlure.entity.OrderActivityEnum;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RequestMapping("/admin/order")

public interface AdminOrderController {

    /**
     * tích hợp all and search
     *
     * @param adminFilterDtoInput
     * @return
     */
    @PostMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Object> findAll(@RequestBody @Valid AdminFilterDtoInput adminFilterDtoInput);

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
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Object> getUserOrder(@PathVariable("userId") Long userId);

    /**
     * xem chi tiết order
     *
     * @param id
     * @return
     */
    @GetMapping("/order-detail/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Object> getOrderById(@PathVariable("id") Long id);

    /**
     * danh sach order cua user
     *
     * @param filter
     * @return
     */
    @PostMapping("/user-orders")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Object> getListOrderByUserId(@RequestBody Filter filter);

    /**
     * xóa order chỉ dành cho amdin
     *
     * @param id
     * @return
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Boolean> deleteOrder(@PathVariable("id") Long id);

    @PostMapping("/change-status-order")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Object> updateStatusOrder(HttpServletRequest req,
                                             @RequestParam OrderActivityEnum type,
                                             @RequestParam Long orderId);


}
