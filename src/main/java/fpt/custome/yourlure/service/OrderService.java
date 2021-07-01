package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoInp.OrderGuestDtoInput;
import fpt.custome.yourlure.dto.dtoInp.OrderUserDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminOrderDetailDtoOut;
import fpt.custome.yourlure.dto.dtoOut.AdminOrderDtoOut;
import fpt.custome.yourlure.dto.dtoOut.StoreUserOrderDtoOut;
import fpt.custome.yourlure.entity.Order;
import org.springframework.data.domain.Pageable;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;


public interface OrderService {

    // store font -----------------------
    Boolean guestProcessOrder(OrderGuestDtoInput orderGuestDtoInput) throws Exception;

    Boolean userProcessOrder(HttpServletRequest rq, OrderUserDtoInput userDtoInput) throws Exception;

    Optional<StoreUserOrderDtoOut> getListUserOrder(HttpServletRequest req, Integer page,
                                                    Integer limit);

    //admin ------------------------------
    Optional<AdminOrderDtoOut> getAll(String keyword, Pageable pageable);

    Optional<AdminOrderDetailDtoOut> getById(Long id);

    Boolean remove(Long id);

    List<AdminOrderDtoOut.OrderDtoOut> mapCustomData(List<Order> list);

    Optional<AdminOrderDtoOut> getOrderByUserId(Long userId, Pageable pageable);
}
