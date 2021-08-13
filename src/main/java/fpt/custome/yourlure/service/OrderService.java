package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoInp.OrderGuestDtoInput;
import fpt.custome.yourlure.dto.dtoInp.OrderUserDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminOrderDtoOut;
import fpt.custome.yourlure.dto.dtoOut.OrderDtoOut;
import fpt.custome.yourlure.entity.*;
import fpt.custome.yourlure.entity.customizemodel.CustomizeModel;
import org.springframework.data.domain.Pageable;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


public interface OrderService {

    // store font -----------------------
    DiscountVoucher verifyDiscountCode(String code) throws Exception;

    Order guestProcessOrder(OrderGuestDtoInput orderGuestDtoInput) throws Exception;

    boolean validateWeightCustom(Float weight, Float minWeight, Float maxWeight);

    @Transactional
    Order userProcessOrder(HttpServletRequest rq, OrderUserDtoInput orderUserDtoInput) throws Exception;

    @Transactional
    boolean cancelOrder(HttpServletRequest rq, Long orderId);

    void returnQuantityCancelOrder(Order order);

    OrderDtoOut myOrders(HttpServletRequest rq, Integer page, Integer limit);

    List<OrderDtoOut.OrderItem> getOrderItemsDto(Order order);

    List<OrderActivity> getOrderActivities(Order order);

    OrderDtoOut getListUserOrder(Long userId, Integer page,
                                 Integer limit);

    OrderDtoOut getListUserOrder(User user, Integer page,
                                 Integer limit);

    Order userBuyNow(HttpServletRequest rq, OrderGuestDtoInput orderIn) throws Exception;

    //admin ------------------------------
    Optional<AdminOrderDtoOut> getAll(String keyword, String typeSearch, Pageable pageable);

    OrderDtoOut.Order orderDetail(Long id);

    boolean updateOrderActivity(HttpServletRequest req, OrderActivityEnum activityEnum, Long orderId);

    Boolean remove(Long id);

    List<AdminOrderDtoOut.OrderDtoOut> mapCustomData(List<Order> list);

    Optional<AdminOrderDtoOut> getOrderByUserId(Long userId, Pageable pageable);

    Float calculateCustomizePrice(CustomizeModel customizeModel);


}
