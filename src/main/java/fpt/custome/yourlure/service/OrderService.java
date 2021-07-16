package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoInp.OrderGuestDtoInput;
import fpt.custome.yourlure.dto.dtoInp.OrderUserDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminOrderDetailDtoOut;
import fpt.custome.yourlure.dto.dtoOut.AdminOrderDtoOut;
import fpt.custome.yourlure.dto.dtoOut.OrderDtoOut;
import fpt.custome.yourlure.entity.DiscountVoucher;
import fpt.custome.yourlure.entity.Order;
import fpt.custome.yourlure.entity.User;
import fpt.custome.yourlure.entity.customizemodel.CustomizeModel;
import org.springframework.data.domain.Pageable;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;


public interface OrderService {

    // store font -----------------------
    DiscountVoucher verifyDiscountCode(String code) throws Exception;
    Order guestProcessOrder(OrderGuestDtoInput orderGuestDtoInput) throws Exception;
    Order userProcessOrder(HttpServletRequest rq, OrderUserDtoInput orderUserDtoInput) throws Exception;
    boolean cancelOrder(HttpServletRequest rq, Long orderId);

    OrderDtoOut myOrders(HttpServletRequest rq, Integer page, Integer limit);

    OrderDtoOut getListUserOrder(Long userId, Integer page,
                                 Integer limit);
    OrderDtoOut getListUserOrder(User user, Integer page,
                                 Integer limit);

    Order userBuyNow(HttpServletRequest rq, OrderGuestDtoInput orderIn) throws Exception;

    //admin ------------------------------
    Optional<AdminOrderDtoOut> getAll(String keyword, String typeSearch, Pageable pageable);

    Optional<AdminOrderDetailDtoOut> getById(Long id);

    Optional<Boolean> updateStatusOrder(HttpServletRequest req, Integer type, Long orderId);

    Boolean remove(Long id);

    List<AdminOrderDtoOut.OrderDtoOut> mapCustomData(List<Order> list);

    Optional<AdminOrderDtoOut> getOrderByUserId(Long userId, Pageable pageable);

    Float calculateCustomizePrice(CustomizeModel customizeModel);


}
