package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoOut.AdminOrderDetailDtoOut;
import fpt.custome.yourlure.dto.dtoOut.AdminOrderDtoOut;
import fpt.custome.yourlure.entity.Order;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;


public interface OrderService {

    //admin store ------------------------------
    Optional<AdminOrderDtoOut> getAll(String keyword, Pageable pageable);

    Optional<AdminOrderDetailDtoOut> getById(Long id);

    Boolean remove(Long id);

    List<AdminOrderDtoOut.OrderDtoOut> mapCustomData(List<Order> list);

    Optional<AdminOrderDtoOut> getOrderByUserId(Long userId, Pageable pageable);
}
