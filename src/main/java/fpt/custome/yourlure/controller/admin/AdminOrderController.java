package fpt.custome.yourlure.controller.admin;

import fpt.custome.yourlure.entity.Filter;
import fpt.custome.yourlure.entity.Order;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/admin/order")
public interface AdminOrderController {

    @GetMapping("/all")
    List<Order> findAll();

    @PostMapping("/search")
    List<Order> search(@RequestBody Filter filter);

    @PostMapping("/add")
    Boolean addOrder(@RequestBody Order order);

    @GetMapping("/{id}")
    Optional<Order> getOrderById(@PathVariable("id") Long id);

    @PostMapping("/{id}")
    Order editOrder(@PathVariable("id") Long id, @RequestBody @Validated Order order);

    @DeleteMapping("/{id}")
    Boolean deleteOrder(@PathVariable("id") Long id);
}
