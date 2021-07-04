package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.OrderGuestDtoInput;
import fpt.custome.yourlure.dto.dtoInp.OrderUserDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminOrderDetailDtoOut;
import fpt.custome.yourlure.dto.dtoOut.AdminOrderDtoOut;
import fpt.custome.yourlure.dto.dtoOut.StoreUserOrderDtoOut;
import fpt.custome.yourlure.entity.*;
import fpt.custome.yourlure.entity.customizemodel.CustomMaterial;
import fpt.custome.yourlure.entity.customizemodel.CustomPrice;
import fpt.custome.yourlure.entity.customizemodel.CustomizeModel;
import fpt.custome.yourlure.repositories.*;
import fpt.custome.yourlure.security.JwtTokenProvider;
import fpt.custome.yourlure.security.exception.CustomException;
import fpt.custome.yourlure.service.OrderService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private CartItemRepos cartItemRepos;

    @Autowired
    private OrderRepos orderRepos;

    @Autowired
    private UserRepos userRepos;

    @Autowired
    private OrderLineRepos orderLineRepos;

    @Autowired
    private OrderActivityRepos orderActivityRepos;

    @Autowired
    private ProductJpaRepos productJpaRepos;

    @Autowired
    private VariantRepos variantRepos;

    @Autowired
    private DiscountVoucherRepos discountVoucherRepos;

    @Autowired
    private PaymentRepos paymentRepos;

    @Autowired
    private CustomPriceRepos customPriceRepos;

    @Autowired
    private CustomizeModelRepos customizeModelRepos;

    @Autowired
    private DiscountVoucherCustomerRepos discountVoucherCustomerRepos;

    @Autowired
    private ModelMapper mapper;

    protected Integer verifyDiscountCode(String discountCode) throws Exception {
        DiscountVoucher voucher = discountVoucherRepos.findByCode(discountCode);
        if (voucher != null) {
            if (voucher.getStart_date().compareTo(new Date()) < 0) {
                // the voucher is not start
                throw new Exception("voucher is not start!");
            }
            if (voucher.getEnd_date().compareTo(new Date()) > 0) {
                // expire voucher
                throw new Exception("voucher is expired!");
            }
            if (voucher.getUsed() >= voucher.getUsageLimit()) {
                throw new Exception("voucher is over used!");
            }
            return voucher.getDiscountValue();
        }
        return 0;
    }

    protected Payment verifyPayment(Long paymentId) {
        try {
            return paymentRepos.getById(paymentId);
        } catch (Exception e) {
            e.printStackTrace();
            return paymentRepos.getByPayment("COD");
        }

    }

    @Override
    public Order guestProcessOrder(OrderGuestDtoInput orderGuestDtoInput) throws Exception {
        Order order = mapper.map(orderGuestDtoInput, Order.class);
        order.setOrderDate(new Date());

        // check payment
        order.setPayment(verifyPayment(orderGuestDtoInput.getPaymentId()));


        // save order information

        order.setDiscount(verifyDiscountCode(orderGuestDtoInput.getDiscountCode()));


        List<OrderLine> orderLines = new ArrayList<>();
        for (CartItem item : orderGuestDtoInput.getCartItems()) {
            OrderLine orderLine = mapper.map(item, OrderLine.class);
            // TODO: calculate product price include custom model
            // get customize price
            List<CustomPrice> customPrices = customPriceRepos.findAll();
            Map<String, Float> prices = customPrices.stream()
                    .collect(Collectors.toMap(CustomPrice::getName, CustomPrice::getPrice));
            Product product = productJpaRepos.getById(item.getProductId());
            if (item.getCustomModelId() != null && product.getCustomizable()) {
                // get default price of product
                Float defaultPrice = product.getDefaultPrice();

                // TODO: calculate price of model
                Float customAmount = (float) 0;
                CustomizeModel customizeModel = customizeModelRepos.getById(item.getCustomModelId());
                for (CustomMaterial material : customizeModel.getCustomMaterials()) {
                    if (material.getColor() != null && !material.getColor().trim().equals("")) { // todo: you can validate for it
                        customAmount += prices.get("COLOR");
                    }
                    if (material.getText() != null && !material.getText().trim().equals("")) {
                        customAmount += prices.get("TEXT");
                    }
                    if (material.getImgUrl() != null && !material.getImgUrl().trim().equals("")) {
                        customAmount += prices.get("IMG");
                    }
                }
                Float totalPrice = defaultPrice + customAmount;
                orderLine.setPrice(totalPrice);

                // summary
            } else {
                // set price by variant
                Variant variant = variantRepos.getById(item.getVariantId());
                if (variant.getQuantity() > 0) {
                    orderLine.setPrice(variant.getNewPrice());
                    orderLine.setImgThumbnail(variant.getImageUrl());
                    variant.setQuantity(variant.getQuantity() - 1);
                    variant = variantRepos.save(variant);

                } else {
                    throw new Exception("Variant out of stock!");
                }

            }

            orderLine.setOrder(order);

            // save order below here
            orderLines.add(orderLine);
        }
        order.setOrderLineCollection(orderLines);
        order = orderRepos.save(order);

        return order;
    }

    @Override
    public Order userProcessOrder(HttpServletRequest rq, OrderUserDtoInput orderUserDtoInput) throws Exception {
        User user = userRepos.findByPhone(jwtTokenProvider.getUsername(jwtTokenProvider.resolveToken(rq)));
        Order order = Order.builder()
                .address(orderUserDtoInput.getAddress())
                .user(user)
                .orderDate(new Date())
                .phone(user.getPhone())
                .discount(verifyDiscountCode(orderUserDtoInput.getDiscountCode()))
                .payment(verifyPayment(orderUserDtoInput.getPaymentId()))
                .receiverName(user.getUsername())
                .note(orderUserDtoInput.getNote())
                .build();

        // create order line
        List<CartItem> cartItems = cartItemRepos.findAllByCartItemIdIn(orderUserDtoInput.getCartItemIds());





        return null;
    }

    @Override
    public Optional<StoreUserOrderDtoOut> getListUserOrder(HttpServletRequest req, Integer page,
                                                           Integer limit) {
        try {
            User user = userRepos.findByPhone(jwtTokenProvider.getUsername(jwtTokenProvider.resolveToken(req)));

            List<StoreUserOrderDtoOut.OrderDtoOut> orderDtoOuts = new ArrayList<>();
            Pageable pageable = PageRequest.of(page,
                    limit,
                    Sort.by("orderDate").descending());
            Page<Order> orders = orderRepos.findAllByUserUserId(user.getUserId(), pageable);
            for (Order item : orders) {
                Optional<AdminOrderDetailDtoOut> adminOrderDetailDtoOut = getById(item.getOrderId());
                StoreUserOrderDtoOut.OrderDtoOut dto = mapper.map(adminOrderDetailDtoOut.get(), StoreUserOrderDtoOut.OrderDtoOut.class);
                orderDtoOuts.add(dto);
            }
            StoreUserOrderDtoOut result = StoreUserOrderDtoOut.builder()
                    .totalItem((int) orders.getTotalElements())
                    .totalPage(orders.getTotalPages())
                    .orderDtoOuts(orderDtoOuts)
                    .build();
            return Optional.of(result);
        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }


    @Override
    public Optional<AdminOrderDtoOut> getAll(String keyword, Pageable pageable) {

        try {
            Page<Order> list = orderRepos.findAllByReceiverNameContainsIgnoreCase(keyword, pageable);
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
                    // map data vào dto
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
