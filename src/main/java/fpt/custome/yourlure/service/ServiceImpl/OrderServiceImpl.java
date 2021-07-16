package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.OrderGuestDtoInput;
import fpt.custome.yourlure.dto.dtoInp.OrderUserDtoInput;
import fpt.custome.yourlure.dto.dtoOut.*;
import fpt.custome.yourlure.entity.*;
import fpt.custome.yourlure.entity.customizemodel.CustomMaterial;
import fpt.custome.yourlure.entity.customizemodel.CustomPrice;
import fpt.custome.yourlure.entity.customizemodel.CustomizeModel;
import fpt.custome.yourlure.repositories.*;
import fpt.custome.yourlure.security.exception.CustomException;
import fpt.custome.yourlure.service.OrderService;
import fpt.custome.yourlure.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private UserService userService;

    @Autowired
    private CartRepos cartRepos;

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

    @Override
    public DiscountVoucherDtoOutput verifyDiscountCode(String discountCode) throws Exception {
        DiscountVoucher voucher = discountVoucherRepos.findByCode(discountCode);
        if (voucher != null) {
            DiscountVoucherDtoOutput result = DiscountVoucherDtoOutput.builder()
                    .type(voucher.getType())
                    .discountValue(verifyDiscountCode(voucher))
                    .maxValue(voucher.getMaxValue())
                    .minSpentAmount(voucher.getMinSpentAmount())
                    .build();
            return result;
        }
        return null;
    }

    public float verifyDiscountCode(DiscountVoucher voucher) throws Exception {
        if (voucher != null) {
            if (voucher.getStart_date() == null || voucher.getStart_date().compareTo(new Date()) > 0) {
                // the voucher is not start
                throw new Exception("voucher is not start!");
            }
            if (voucher.getEnd_date() == null || voucher.getEnd_date().compareTo(new Date()) < 0) {
                // expire voucher
                throw new Exception("voucher is expired!");
            }
            if (voucher.getType().equals("Free Ship")) {
                return 0;
            } else {
                if (voucher.getType().equals("Giá Trị")) {
                    return voucher.getDiscountValue();
                } else {
                    if (voucher.getDiscountValue() != 0)
                        return voucher.getDiscountValue() / 100;
                    else
                        throw new Exception("voucher must not zero(0)!");
                }
            }
        }
        return -1;
    }

    protected Payment verifyPayment(Long paymentId) {
        try {
            Optional<Payment> payment = paymentRepos.findById(paymentId);
            if (payment.isPresent()) {
                return payment.get();
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    protected List<OrderLine> createOrderLines(Order order, List<CartItem> items) throws Exception {
        if (items.isEmpty()) {
            throw new Exception("Bạn cần chọn 1 sản phẩm hoặc customize!");
        }
        List<OrderLine> orderLines = new ArrayList<>();

        for (CartItem item : items) {
            OrderLine orderLine = mapper.map(item, OrderLine.class);


            if (item.getCustomModelId() != null) {
                // get default price of product
                // TODO: calculate price of model
                CustomizeModel customizeModel = customizeModelRepos.getById(item.getCustomModelId());
                Product product = customizeModel.getModel3d().getProduct();

                Float defaultPrice = product.getDefaultPrice();
                Float customAmount = calculateCustomizePrice(customizeModel);
                Float totalPrice = defaultPrice + customAmount;
                orderLine.setPrice(totalPrice);
                orderLine.setImgThumbnail(customizeModel.getThumbnailUrl());

            } else if (item.getVariantId() != null) {
                // set price by variant
                Variant variant = variantRepos.getById(item.getVariantId());
                if (variant.getQuantity() > 0) {
                    if (variant.getNewPrice() == null) {
                        orderLine.setPrice(variant.getProduct().getDefaultPrice());
                    } else {
                        orderLine.setPrice(variant.getNewPrice());
                    }
                    orderLine.setImgThumbnail(variant.getImageUrl());

                    // decrease variant when order variant
                    variant.setQuantity(variant.getQuantity() - 1);
                    variant = variantRepos.save(variant);

                } else {
                    throw new Exception("Variant out of stock!");
                }
            } else {
                throw new Exception("Bạn cần chọn 1 sản phẩm hoặc customize!");
            }

            orderLine.setOrder(order);
            orderLine = orderLineRepos.save(orderLine);
            // save order below here
            orderLines.add(orderLine);

            // delete cartItem after create orderline
            cartItemRepos.delete(item);

            // add order activity
            OrderActivity activity = OrderActivity.builder()
                    .activityName(OrderActivityEnum.PENDING)
                    .date(new Date())
                    .order(order)
                    .build();
            activity = orderActivityRepos.save(activity);

        }
        return orderLines;

    }

    @Transactional
    @Override
    public Order guestProcessOrder(OrderGuestDtoInput orderGuestDtoInput) throws Exception {
        Order order = mapper.map(orderGuestDtoInput, Order.class);
        order.setOrderDate(new Date());

        // check payment
        order.setPayment(verifyPayment(orderGuestDtoInput.getPaymentId()));

        // save order information

        List<OrderLine> orderLines = createOrderLines(order, orderGuestDtoInput.getCartItems());
        List<CartItem> items = orderGuestDtoInput.getCartItems();

        // check condition and apply discount
        DiscountVoucher voucher = discountVoucherRepos.findByCode(orderGuestDtoInput.getDiscountCode());
        if (calculateItemPrices(items) >= voucher.getMinSpentAmount()) {
            order.setDiscount(verifyDiscountCode(voucher));
        }

        order.setOrderLineCollection(orderLines);
        order = orderRepos.save(order);

        return order;
    }

    @Transactional
    @Override
    public Order userProcessOrder(HttpServletRequest rq, OrderUserDtoInput orderUserDtoInput) throws Exception {
        if (orderUserDtoInput.getCartItemIds() == null || orderUserDtoInput.getCartItemIds().size() == 0) {
            throw new Exception("vui lòng chọn sản phẩm để đặt hàng!");
        }

        User user = userService.whoami(rq);

        // check payment
        Payment payment = verifyPayment(orderUserDtoInput.getPaymentId());
        if (payment == null) {
            throw new Exception("phương thức thanh toán không tồn tại!");
        }

        Order order = Order.builder()
                .address(orderUserDtoInput.getAddress())
                .user(user)
                .orderDate(new Date())
                .phone(orderUserDtoInput.getPhone())
                .payment(payment)
                .receiverName(orderUserDtoInput.getReceiverName())
                .note(orderUserDtoInput.getNote())
                .build();
        order = orderRepos.save(order);
        // TODO: create order line
        Cart cart = cartRepos.findCartByUserUserId(user.getUserId()).orElse(null);
        if (cart == null) {
            throw new Exception("can't process order because cart is empty!");
        }

        List<CartItem> items = cart.getCartItemCollection().stream()
                .filter(cartItem -> orderUserDtoInput.getCartItemIds().contains(cartItem.getCartItemId()))
                .collect(Collectors.toList());

        List<OrderLine> orderLines = createOrderLines(order, items);

        // check condition and apply discount
        if (orderUserDtoInput.getDiscountCode() != null && !"".equals(orderUserDtoInput.getDiscountCode())) {
            float totalAmount = calculateItemPrices(items);
            DiscountVoucherDtoOutput voucher = verifyDiscountCode(orderUserDtoInput.getDiscountCode());
            if (voucher == null) {
                throw new Exception("voucher giảm giá không chính xác!");
            }
            float shippingFee = 25000;
            float discount = 0;

            switch (voucher.getType()) {
                case "Free Ship":
                    discount = shippingFee;
                    break;
                case "Giá Trị":
                    discount = voucher.getDiscountValue();
                    break;
                default: {
                    if (voucher.getMaxValue() < voucher.getDiscountValue() * totalAmount) {
                        discount = voucher.getMaxValue();
                    } else {
                        discount = voucher.getDiscountValue() * totalAmount;
                    }
                }
                break;
            }

            if (totalAmount >= voucher.getMinSpentAmount()) {
                order.setDiscount(discount);
            }
            order.setDiscount(discount);
        }

        order.setOrderLineCollection(orderLines);
        order = orderRepos.save(order);

        return order;

    }

    @Override
    public boolean cancelOrder(HttpServletRequest rq, Long orderId) {
        User user = userService.whoami(rq);
        Optional<Order> order = orderRepos.findById(orderId);
        if(order.isPresent()){
            List<Order> orders = orderRepos.findAllByUserUserId(user.getUserId());
            if(orders.stream().anyMatch(ord -> ord.getOrderId().equals(orderId))){
                orderRepos.deleteById(orderId);
                return true;
            }
        }
        return false;
    }

    @Override
    public OrderDtoOut myOrders(HttpServletRequest rq, Integer page, Integer limit) {
        User user = userService.whoami(rq);
        Pageable pageable = PageRequest.of(page,
                limit,
                Sort.by("orderDate").descending());
        Page<Order> result = orderRepos.findAllByUserUserId(user.getUserId(), pageable);
        if (result.getTotalElements() > 0) {
            List<OrderDtoOut.Order> orders = new ArrayList<>();

            for (Order order : result.getContent()) {
                List<OrderDtoOut.OrderItem> items = new ArrayList<>();
                for (OrderLine orderLine : order.getOrderLineCollection()) {
                    // get more information order line

                    OrderDtoOut.OrderItem item = mapper.map(orderLine, OrderDtoOut.OrderItem.class);

                    if (orderLine.getCustomModelId() != null) {
                        Optional<CustomizeModel> customizeModel = customizeModelRepos.findById(orderLine.getCustomModelId());
                        customizeModel.ifPresent(model -> {
                            item.setCustomizeName(model.getName());
                            item.setThumbnailUrl(model.getThumbnailUrl());
                        });
                    }

                    if (orderLine.getVariantId() != null) {
                        Optional<Variant> variant = variantRepos.findById(orderLine.getVariantId());
                        variant.ifPresent(var -> {
                            item.setProductName(var.getProduct().getProductName());
                            item.setVariantName(var.getVariantName());
                            item.setThumbnailUrl(var.getImageUrl());
                        });
                    }

                    items.add(item);
                }

                OrderDtoOut.Order orderDtoOut = mapper.map(order, OrderDtoOut.Order.class);
                orderDtoOut.setItems(items);
                List<OrderActivity> activities = orderActivityRepos.findAllByOrderId(order.getOrderId());
                if (!activities.isEmpty()) {
                    orderDtoOut.setActivity(activities.stream().findFirst().get().getActivityName());
                }else{
                    orderDtoOut.setActivity(OrderActivityEnum.PENDING);
                }
                // add to list order to show on FE
                orders.add(orderDtoOut);

            }


            OrderDtoOut orderDtoOut = OrderDtoOut.builder()
                    .totalItem(orders.size())
                    .totalPage(result.getTotalPages())
                    .orders(orders)
                    .build();
            return orderDtoOut;
        }

        return null;
    }

    @Override
    public Float calculateCustomizePrice(CustomizeModel customizeModel) {
        // TODO: calculate product price include custom model
        // get customize price
        List<CustomPrice> customPrices = customPriceRepos.findAll();
        Map<String, Float> prices = customPrices.stream()
                .collect(Collectors.toMap(CustomPrice::getName, CustomPrice::getPrice));

        // calculate custom model price
        float customAmount = 0;
        for (CustomMaterial material : customizeModel.getCustomMaterials()) {
            if (material.getColor() != null && !material.getColor().trim().equals("")) { // todo: you can validate for it
                customAmount += prices.get("COLOR");
            }
            if (material.getText() != null && !material.getText().trim().equals("")) {
                customAmount += prices.get("TEXT");
            }
            if (material.getImg() != null && !material.getImg().trim().equals("")) {
                customAmount += prices.get("IMG");
            }
        }
        return customAmount;
    }

    @Override
    public Order userBuyNow(HttpServletRequest rq, OrderGuestDtoInput orderIn) {
        return null;
    }

    public Float calculateItemPrices(List<CartItem> items) {
        float totalPrice = 0;
        for (CartItem item : items) {
            if (item.getCustomModelId() != null) {
                CustomizeModel customizeModel = customizeModelRepos.getById(item.getCustomModelId());
                totalPrice += calculateCustomizePrice(customizeModel);
            } else {
                // set price by variant
                Variant variant = variantRepos.getById(item.getVariantId());
                if (variant.getQuantity() > 0) {
                    totalPrice += variant.getNewPrice();
                }
            }
        }
        return totalPrice;
    }


    @Override
    public Optional<StoreUserOrderDtoOut> getListUserOrder(HttpServletRequest req, Integer page,
                                                           Integer limit) {
        try {
            User user = userService.whoami(req);

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
    public Optional<AdminOrderDtoOut> getAll(String keyword, String typeSearch, Pageable pageable) {

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
            Optional<Order> order = orderRepos.findById(id);
            List<AdminOrderDetailDtoOut.ProductDtoOut> productDtoOutList = new ArrayList<>();
            if (order.isPresent()) {
                AdminOrderDetailDtoOut result = mapper.map(order.get(), AdminOrderDetailDtoOut.class);
                List<OrderLine> orderLineList = (List<OrderLine>) order.get().getOrderLineCollection();
                for (OrderLine item : orderLineList) {
                    if (item.getProductId() != null){
                        //todo: hiện tại data đang lỗi vì không có lưu productId. sau khi có sẽ check lại
                        AdminOrderDetailDtoOut.ProductDtoOut productDtoOut = mapper.map(productJpaRepos.findById(item.getProductId()).get(), AdminOrderDetailDtoOut.ProductDtoOut.class);
                        productDtoOut.setPrice(item.getPrice());
                        productDtoOut.setQuantity(item.getQuantity());
                        productDtoOut.setVariantId(item.getVariantId());

                        // todo: vua sua lai db cua order. xong phai sua nay cho nay
//                    productDtoOut.setThumbnailUrl(item.getTextureImg());
                        //TODO: truy van customize trong bang customize roi gan vao
//                    productDtoOut.setCustomizeId(item.getCustomizeId());
                        productDtoOutList.add(productDtoOut);
                    }
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
            if (orderLineList != null){
                float total = 0;
                for (OrderLine orderLine : orderLineList) {
                    total += orderLine.getPrice() * orderLine.getQuantity();
                }
                dtoOut.setTotal(total);
            }
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
