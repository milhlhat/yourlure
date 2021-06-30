package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.OrderDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminOrderDetailDtoOut;
import fpt.custome.yourlure.dto.dtoOut.AdminOrderDtoOut;
import fpt.custome.yourlure.entity.Order;
import fpt.custome.yourlure.entity.OrderActivity;
import fpt.custome.yourlure.entity.OrderLine;
import fpt.custome.yourlure.repositories.*;
import fpt.custome.yourlure.security.JwtTokenProvider;
import fpt.custome.yourlure.security.exception.CustomException;
import fpt.custome.yourlure.service.OrderService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private CartItemRepos cartItemRepos;

    @Autowired
    private OrderRepos orderRepos;

    @Autowired
    private OrderLineRepos orderLineRepos;

    @Autowired
    private OrderActivityRepos orderActivityRepos;

    @Autowired
    private ProductJpaRepos productJpaRepos;

    @Autowired
    private DiscountVoucherRepos discountVoucherRepos;

    @Autowired
    private DiscountVoucherCustomerRepos discountVoucherCustomerRepos;

    @Autowired
    private ModelMapper mapper;

    @Override
    public Boolean processOrder(HttpServletRequest rq, OrderDtoInput orderDtoInput) {
        try{
            String tokenResolve = jwtTokenProvider.getUsername(jwtTokenProvider.resolveToken(rq));
//            User user = userRepos.findByPhone();
        }catch (Exception e){
            System.out.println(e.getMessage());
            // process for Guest
            System.out.println();
        }

        // save order information
        Order order = Order.builder()
                .address(orderDtoInput.getAddress())
                .orderDate(new Date())
                .receiverName(orderDtoInput.getReceiverName())

                .build();


//        List<CartItem> cartItems = new ArrayList<>();
//        for (Long cartItemId : orderDtoInput.getCartItems()) {
//            CartItem item = cartItemRepos.getById(cartItemId);
//            OrderLine orderLine = mapper.map(item, OrderLine.class);
//            // save order line behind here
//        }
        return false;
    }


    @Override
    public Optional<AdminOrderDtoOut> getAll(String keyword, Pageable pageable) {

        try {
            Page<Order> list = orderRepos.findAllByNameOrPhoneContainsIgnoreCase(keyword, "", pageable);
            if (list.getContent().isEmpty()) {
                throw new CustomException("Doesn't exist", HttpStatus.NOT_FOUND);
            } else {
                // map data vao AdminOrderDtoOut.OrderDtoOut
                List<AdminOrderDtoOut.OrderDtoOut> orderDtoOuts = mapCustomData(list.getContent());
                AdminOrderDtoOut result = AdminOrderDtoOut.builder()
                        .orderDtoOutList(orderDtoOuts)
                        .totalPage(list.getTotalPages())
                        .totalOrder((int) list.getTotalElements())
                        .build();

                return Optional.of(result);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }

    @Override
    public Optional<AdminOrderDetailDtoOut> getById(Long id) {
        try {
            Optional<Order> optional = orderRepos.findById(id);
            List<AdminOrderDetailDtoOut.ProductDtoOut> productDtoOutList = new ArrayList<>();
            if (optional.isPresent()) {
                AdminOrderDetailDtoOut result = mapper.map(optional.get(), AdminOrderDetailDtoOut.class);
                List<OrderLine> orderLineList = (List<OrderLine>) optional.get().getOrderLineCollection();
                for (OrderLine item : orderLineList) {
                    //todo: hiện tại data đang lỗi vì không có lưu productId. sau khi có sẽ check lại
                    AdminOrderDetailDtoOut.ProductDtoOut productDtoOut = mapper.map(
                            productJpaRepos.findById(item.getProductId()).get(), AdminOrderDetailDtoOut.ProductDtoOut.class);
                    productDtoOut.setPrice(item.getPrice());
                    productDtoOut.setQuantity(item.getQuantity());
                    productDtoOut.setVariantId(item.getVariantId());

                    // todo: vua sua lai db cua order. xong phai sua nay cho nay
//                    productDtoOut.setThumbnailUrl(item.getTextureImg());
                    //TODO: truy van customize trong bang customize roi gan vao
//                    productDtoOut.setCustomizeId(item.getCustomizeId());
                    productDtoOutList.add(productDtoOut);

                }
                result.setProductDtoOuts(productDtoOutList);
                return Optional.of(result);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Optional.empty();
    }

    @Override
    public Boolean remove(Long id) {
        try {
            orderRepos.deleteById(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * map data tu order vao dto da custom
     *
     * @param list
     * @return
     */
    public List<AdminOrderDtoOut.OrderDtoOut> mapCustomData(List<Order> list) {
        List<AdminOrderDtoOut.OrderDtoOut> result = new ArrayList<>();
        for (Order item : list) {
            AdminOrderDtoOut.OrderDtoOut dtoOut = mapper.map(item, AdminOrderDtoOut.OrderDtoOut.class);
            OrderActivity orderActivity = orderActivityRepos.findByOrder_OrderId(item.getOrderId());
            if (orderActivity != null) {
                dtoOut.setStatusName(orderActivity.getActivityName());
            }
            List<OrderLine> orderLineList = orderLineRepos.findByOrder_OrderId(item.getOrderId());
            float total = 0;
            for (OrderLine orderLine : orderLineList) {
                total += orderLine.getPrice() * orderLine.getQuantity();
            }
            dtoOut.setTotal(total);
            result.add(dtoOut);
        }
        return result;
    }

    @Override
    public Optional<AdminOrderDtoOut> getOrderByUserId(Long userId, Pageable pageable) {
        try {
            // lay OrderOfUser
            Page<Order> list = orderRepos.findAllByUserUserId(userId, pageable);
            // map data vào dto
            AdminOrderDtoOut result = AdminOrderDtoOut.builder()
                    .totalOrder((int) list.getTotalElements())
                    .totalPage(list.getTotalPages())
                    .orderDtoOutList(mapCustomData(list.getContent()))
                    .build();
            //trả về kết quả
            return Optional.of(result);
        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }
}
