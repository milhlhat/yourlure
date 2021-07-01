package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoInp.OrderDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminOrderDetailDtoOut;
import fpt.custome.yourlure.dto.dtoOut.AdminOrderDtoOut;
import fpt.custome.yourlure.entity.Order;
import org.springframework.data.domain.Pageable;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;


public interface OrderService {

    // store font -----------------------
    Boolean processOrder(HttpServletRequest rq, OrderDtoInput orderDtoInput);

    //admin ------------------------------
    Optional<AdminOrderDtoOut> getAll(String keyword, Pageable pageable);

    Optional<AdminOrderDetailDtoOut> getById(Long id);

    Boolean remove(Long id);

    List<AdminOrderDtoOut.OrderDtoOut> mapCustomData(List<Order> list);

    Optional<AdminOrderDtoOut> getOrderByUserId(Long userId, Pageable pageable);
}
