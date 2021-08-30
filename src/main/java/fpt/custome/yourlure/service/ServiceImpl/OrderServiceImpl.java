package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.OrderGuestDtoInput;
import fpt.custome.yourlure.dto.dtoInp.OrderUserDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminOrderDtoOut;
import fpt.custome.yourlure.dto.dtoOut.OrderDtoOut;
import fpt.custome.yourlure.entity.*;
import fpt.custome.yourlure.entity.customizemodel.CustomMaterial;
import fpt.custome.yourlure.entity.customizemodel.CustomPrice;
import fpt.custome.yourlure.entity.customizemodel.CustomizeModel;
import fpt.custome.yourlure.repositories.*;
import fpt.custome.yourlure.security.JwtTokenProvider;
import fpt.custome.yourlure.security.exception.CustomException;
import fpt.custome.yourlure.service.OrderService;
import fpt.custome.yourlure.service.OtpService;
import fpt.custome.yourlure.service.ProductService;
import fpt.custome.yourlure.service.UserService;
import org.apache.commons.lang3.RandomStringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import javax.validation.ValidationException;
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
    private CustomMaterialRepos customMaterialRepos;

    @Autowired
    private CustomizeModelRepos customizeModelRepos;

    @Autowired
    private DiscountVoucherCustomerRepos discountVoucherCustomerRepos;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private ProductService productService;

    @Autowired
    private OtpService otpService;

    @Override
    public DiscountVoucher verifyDiscountCode(String discountCode) throws Exception {
        if (discountCode == null) {
            throw new Exception("vui lòng nhập discount code!");
        }
        DiscountVoucher voucher = discountVoucherRepos.findByCode(discountCode);

        if (voucher == null) {
            throw new Exception("Mã giảm giá không đúng");
        }

        if (voucher.getStart_date() == null || voucher.getStart_date().compareTo(new Date()) > 0) {
            // the voucher is not start
            throw new Exception("Mã giảm giá chưa bắt đầu!");
        }
        if (voucher.getEnd_date() == null || voucher.getEnd_date().compareTo(new Date()) < 0) {
            // expire voucher
            throw new Exception("Mã giảm giá đã hết hạn!");
        }

        return voucher;
    }

    protected Payment verifyPayment(Long paymentId) throws Exception {
        Optional<Payment> payment = paymentRepos.findById(paymentId);
        if (!payment.isPresent()) {
            throw new Exception("Phương thức thanh toán không đúng!");
        }
        return payment.get();
    }

    public boolean validateWeightCustom(Float weight, Float minWeight, Float maxWeight){
        if (weight != null && minWeight != null && maxWeight != null
                && weight >= minWeight && weight <= maxWeight) {
            return true;
        }
        return false;
    }

    @Transactional
    protected List<OrderLine> createOrderLines(Order order, List<CartItem> items) throws Exception {
        if (items.isEmpty()) {
            throw new Exception("Bạn cần chọn 1 sản phẩm hoặc customize!");
        }
        List<OrderLine> orderLines = new ArrayList<>();

        for (CartItem item : items) {
            OrderLine orderLine = mapper.map(item, OrderLine.class);

            if (item.getCustomModelId() != null) {

                // create a clone customize model to disable editable of customer
                CustomizeModel original = customizeModelRepos.getById(item.getCustomModelId());
                CustomizeModel customizeModel = new CustomizeModel(original);
                customizeModel = customizeModelRepos.save(customizeModel);
                customizeModel.setCustomMaterials(Collections.emptyList());
                for (CustomMaterial customMaterial : original.getCustomMaterials()) {
                    customizeModel.getCustomMaterials().add(customMaterialRepos.save(new CustomMaterial(customMaterial, customizeModel)));
                }

                // get default price of product
                // TODO: calculate price of model
                Product product = customizeModel.getModel3d().getProduct();
                if(product.getIsCustomizeWeight() && !validateWeightCustom(item.getWeight(), product.getMinWeight(), product.getMaxWeight())){
                    throw new ValidationException("Vui lòng chọn đúng trọng lượng trong khoảng " + product.getMinWeight() + " đến " + product.getMaxWeight());
                }
                Float defaultPrice = product.getDefaultPrice();
                Float customAmount = calculateCustomizePrice(customizeModel);
                Float totalPrice = defaultPrice + customAmount;
                orderLine.setCustomModelId(customizeModel.getCustomizeId());
                orderLine.setPrice(totalPrice);
                orderLine.setImgThumbnail(customizeModel.getThumbnailUrl());
                orderLine.setCustomModelName(customizeModel.getName());
                orderLine.setProductName(product.getProductName());
                orderLine.setWeight(productService.validateWeight(customizeModel.getModel3d().getProduct(), item.getWeight()));
                orderLine.setProductId(product.getProductId());

            } else if (item.getVariantId() != null) {
                // set price by variant
                Variant variant = variantRepos.getById(item.getVariantId());
                Product product = variant.getProduct();
                int quantity = orderLine.getQuantity();
                if(quantity > 50){
                    throw new ValidationException("Bạn chỉ được mua tối đa 50 sản phẩm!");
                }
                if(quantity > variant.getQuantity()){
                    throw new ValidationException(product.getProductName() + ", " + variant.getVariantName() + " chỉ còn " + variant.getQuantity() + " sản phẩm!");
                }
                if(product.getIsCustomizeWeight() && !validateWeightCustom(item.getWeight(), product.getMinWeight(), product.getMaxWeight())){
                    throw new ValidationException("Vui lòng chọn đúng trọng lượng trong khoảng " + product.getMinWeight() + " đến " + product.getMaxWeight());
                }
                if (variant.getQuantity() > 0) {
                    if (variant.getNewPrice() == null) {
                        orderLine.setPrice(variant.getProduct().getDefaultPrice());
                    } else {
                        orderLine.setPrice(variant.getNewPrice());
                    }
                    orderLine.setImgThumbnail(variant.getImageUrl());
                    orderLine.setVariantName(variant.getVariantName());
                    orderLine.setProductId(variant.getProduct().getProductId());
                    orderLine.setWeight(productService.validateWeight(product, item.getWeight()));
                    orderLine.setProductName(variant.getProduct().getProductName());

                    // decrease variant when order variant
                    variant.setQuantity(variant.getQuantity() - item.getQuantity());
                    variant = variantRepos.save(variant);

                } else {
                    throw new Exception("Mã màu này đã hết hàng!");
                }
            } else {
                throw new Exception("Bạn cần chọn 1 sản phẩm hoặc tuỳ biến!");
            }

            orderLine.setOrder(order);
            orderLine = orderLineRepos.save(orderLine);
            // save order below here
            orderLines.add(orderLine);

            // delete cartItem after create orderline
            cartItemRepos.delete(item);

        }
        return orderLines;

    }

    protected String genOrderCode() {
        return new Date().getTime() + RandomStringUtils.randomAlphanumeric(8);
    }

    @Override
    public Order guestProcessOrder(OrderGuestDtoInput orderGuestDtoInput) throws Exception {
        // verify phone number
        orderGuestDtoInput.setPhone(userService.verifyPhone(orderGuestDtoInput.getPhone()));

        Order order = mapper.map(orderGuestDtoInput, Order.class);
        order.setOrderCode(genOrderCode());
        order.setOrderDate(new Date());

        // check payment
        order.setPayment(verifyPayment(orderGuestDtoInput.getPaymentId()));

        // save order information
        order = orderRepos.save(order);
        List<OrderLine> orderLines = createOrderLines(order, orderGuestDtoInput.getCartItems());
        List<CartItem> items = orderGuestDtoInput.getCartItems();

        // check condition and apply discount
        order.setDiscount(calculateDiscount(orderGuestDtoInput.getDiscountCode(), calculateItemPrices(items)));

        order.setOrderLineCollection(orderLines);
        order = orderRepos.save(order);

        OrderActivity activity = switchActivity(order, OrderActivityEnum.PENDING, null);
        order.setActivities(Collections.singleton(activity));

        return order;
    }


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
                .orderCode(genOrderCode())
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
            throw new Exception("Vui lòng thêm sản phẩm vào giỏ hàng trước khi tiến hành đặt hàng!");
        }

        List<CartItem> items = cart.getCartItemCollection().stream()
                .filter(cartItem -> orderUserDtoInput.getCartItemIds().contains(cartItem.getCartItemId()))
                .collect(Collectors.toList());
        // calculate discount
        order.setDiscount(calculateDiscount(orderUserDtoInput.getDiscountCode(), calculateItemPrices(items)));

        List<OrderLine> orderLines = createOrderLines(order, items);

        order.setOrderLineCollection(orderLines);
        order = orderRepos.save(order);

        OrderActivity activity = switchActivity(order, OrderActivityEnum.PENDING, user);
        order.setActivities(Collections.singleton(activity));

        return order;

    }

    @Transactional
    @Override
    public boolean cancelOrder(HttpServletRequest rq, Long orderId) {
        User user = userService.whoami(rq);
        Optional<Order> order = orderRepos.findById(orderId);
        if (order.isPresent()) {
            List<Order> orders = orderRepos.findAllByUserUserId(user.getUserId());
            if (orders.stream().anyMatch(ord -> ord.getOrderId().equals(orderId))) {
                OrderActivity activity = switchActivity(order.get(), OrderActivityEnum.CUSTOMER_REJECT, user);
                if (activity != null) {
                    returnQuantityCancelOrder(order.get());
                    return true;
                }
            }
        }
        return false;
    }

    @Transactional
    @Override
    public void returnQuantityCancelOrder(Order order) {
        Collection<OrderLine> orderLines = order.getOrderLineCollection();
        for (OrderLine orderLine : orderLines) {
            if (orderLine.getVariantId() != null) {
                Optional<Variant> variant = variantRepos.findById(orderLine.getVariantId());
                variant.ifPresent(value -> {
                    value.setQuantity(value.getQuantity() + orderLine.getQuantity());
                    variantRepos.save(value);
                });
            }
        }
    }

    @Override
    public OrderDtoOut myOrders(HttpServletRequest rq, Integer page, Integer limit) {
        User user = userService.whoami(rq);
        if (user != null) {
            return getListUserOrder(user, page, limit);

        }
        return null;
    }

    @Override
    public List<OrderDtoOut.OrderItem> getOrderItemsDto(Order order) {
        List<OrderDtoOut.OrderItem> items = new ArrayList<>();
        for (OrderLine orderLine : order.getOrderLineCollection()) {
            // get more information order line

            OrderDtoOut.OrderItem item = mapper.map(orderLine, OrderDtoOut.OrderItem.class);

            if (orderLine.getCustomModelId() != null) {
                Optional<CustomizeModel> customizeModel = customizeModelRepos.findById(orderLine.getCustomModelId());
                customizeModel.ifPresent(model -> {
//                    item.setCustomizeName(model.getName());
                    item.setThumbnailUrl(model.getThumbnailUrl());
                    item.setCategoryName(model.getModel3d().getProduct().getCategory().getCategoryName());
                    item.setVisibleInStorefront(model.getModel3d().getProduct().getVisibleInStorefront());
                });
            }

            if (orderLine.getVariantId() != null) {
                Optional<Variant> variant = variantRepos.findById(orderLine.getVariantId());
                variant.ifPresent(var -> {
                    item.setCategoryName(var.getProduct().getCategory().getCategoryName());
//                    item.setProductName(var.getProduct().getProductName());
//                    item.setVariantName(var.getVariantName());
                    item.setThumbnailUrl(var.getImageUrl());
                    item.setVisibleInStorefront(var.getProduct().getVisibleInStorefront());
                });
            }

            items.add(item);
        }

        return items;
    }

    @Override
    public List<OrderActivity> getOrderActivities(Order order) {
        if (order != null && order.getOrderId() != null) {
            return orderActivityRepos.findAllByOrderId(order.getOrderId());
        }

        return Collections.emptyList();
    }

    @Override
    public OrderDtoOut getListUserOrder(Long userId, Integer page, Integer limit) {
        if (userId != null) {
            Optional<User> user = userRepos.findById(userId);
            if (user.isPresent()) {
                return getListUserOrder(user.get(), page, limit);
            }
        }

        return null;
    }

    public float calculateDiscount(String code, float totalAmount) throws Exception {
        // check condition and apply discount
        if (code != null && !"".equals(code)) {
            DiscountVoucher voucher = verifyDiscountCode(code);

            if (voucher.getMinSpentAmount() != null && totalAmount < voucher.getMinSpentAmount()) {
                throw new Exception("tổng tiền của đơn hàng không đủ để áp dụng mã giảm giá");
            }

            float shippingFee = 25000;
            float discount;

            switch (voucher.getType()) {
                case "Free Ship":
                    discount = shippingFee;
                    break;
                case "Giá trị":
                    discount = voucher.getDiscountValue();
                    break;
                default: { // Phần trăm
                    if (voucher.getMaxValue() < voucher.getDiscountValue() * totalAmount) {
                        discount = voucher.getMaxValue();
                    } else {
                        discount = voucher.getDiscountValue() * totalAmount;
                    }
                }
                break;
            }

            return Math.min(totalAmount, discount);
        }
        return 0;
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
    public Order userBuyNow(HttpServletRequest rq, OrderGuestDtoInput orderInput) throws Exception {
        User user = userService.whoami(rq);
        if (orderInput.getCartItems() == null || orderInput.getCartItems().size() == 0) {
            throw new Exception("vui lòng chọn sản phẩm để đặt hàng!");
        }
        if (orderInput.getPaymentId() == null) {
            throw new Exception("vui lòng chọn phương thức thanh toán!");
        }

        Order order = mapper.map(orderInput, Order.class);
        order.setUser(user);
        order.setOrderCode(genOrderCode());
        order.setOrderDate(new Date());
        order.setPayment(verifyPayment(orderInput.getPaymentId()));
        order.setDiscount(calculateDiscount(orderInput.getDiscountCode(), calculateItemPrices(orderInput.getCartItems())));
        order = orderRepos.save(order);

        List<OrderLine> orderLines = createOrderLines(order, orderInput.getCartItems());
        order.setOrderLineCollection(orderLines);
        OrderActivity activity = switchActivity(order, OrderActivityEnum.PENDING, user);
        order.setActivities(Collections.singleton(activity));
        return order;
    }

    public Float calculateItemPrices(List<CartItem> items) {
        float totalPrice = 0;
        for (CartItem item : items) {
            if (item.getCustomModelId() != null) {
                CustomizeModel customizeModel = customizeModelRepos.getById(item.getCustomModelId());
                totalPrice += calculateCustomizePrice(customizeModel) * item.getQuantity();
            } else {
                // set price by variant
                Optional<Variant> variant = variantRepos.findById(item.getVariantId());
                if (!variant.isPresent()) {
                    throw new ValidationException("Vui lòng chọn sản phẩm trước khi thanh toán!");
                }
                if (variant.get().getQuantity() > 0) {
                    totalPrice += variant.get().getNewPrice() * item.getQuantity();
                }
            }
        }
        return totalPrice;
    }


    @Override
    public OrderDtoOut getListUserOrder(User user, Integer page,
                                        Integer limit) {
        Pageable pageable = PageRequest.of(page,
                limit,
                Sort.by("orderDate").descending());
        Page<Order> result = orderRepos.findAllByUserUserId(user.getUserId(), pageable);
        if (result.getTotalElements() > 0) {
            List<OrderDtoOut.Order> orders = new ArrayList<>();

            for (Order order : result.getContent()) {
                OrderDtoOut.Order orderDtoOut = mapper.map(order, OrderDtoOut.Order.class);
                orderDtoOut.setPaymentName(order.getPayment().getPayment());
                orderDtoOut.setItems(getOrderItemsDto(order));
                orderDtoOut.setActivities(getOrderActivities(order));
                // add to list order to show on FE
                orders.add(orderDtoOut);

            }

            OrderDtoOut orderDtoOut = OrderDtoOut.builder()
                    .totalItem(result.getTotalElements())
                    .totalPage(result.getTotalPages())
                    .orders(orders)
                    .build();
            return orderDtoOut;
        }

        return null;
    }


    @Override
    public Optional<AdminOrderDtoOut> getAll(String keyword, String typeSearch, Pageable pageable) {

        try {
            Page<Order> list = orderRepos.findAllByReceiverNameContainsIgnoreCase(keyword, pageable);
            if (list.getContent().isEmpty()) {
                throw new CustomException("Không tìm thấy đơn hàng nào", HttpStatus.NOT_FOUND);
            } else {
                // map data vao AdminOrderDtoOut.OrderDtoOut
                List<AdminOrderDtoOut.OrderDtoOut> orderDtoOuts = mapCustomData(list.getContent());
                AdminOrderDtoOut result = AdminOrderDtoOut.builder()
                        .orders(orderDtoOuts)
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
    public OrderDtoOut.Order orderDetail(Long id) {

        if (id == null) {
            throw new ValidationException("Vui lòng chọn đúng order!");
        }
        Optional<Order> order = orderRepos.findById(id);
        if (!order.isPresent()) {
            throw new ValidationException("Không tìm thấy order đã yêu cầu!");
        }

        return orderDetail(order.get());
    }

    public OrderDtoOut.Order orderDetail(Order order) {
        OrderDtoOut.Order orderDtoOut = mapper.map(order, OrderDtoOut.Order.class);
        orderDtoOut.setPaymentName(order.getPayment().getPayment());
        orderDtoOut.setItems(getOrderItemsDto(order));
        orderDtoOut.setActivities(getOrderActivities(order));
        User user = order.getUser();
        orderDtoOut.setUserId(user != null ? user.getUserId() : null);
        return orderDtoOut;
    }


    public OrderActivity switchActivity(Order order, OrderActivityEnum activityIn, User assigner) {
        List<OrderActivity> activities = getOrderActivities(order);

        if (!activities.isEmpty()) {
            // Can't add when last activity is CUSTOMER_REJECT OR STAFF_REJECT OR ACCEPT
            switch (activities.get(0).getActivityName()) {
                case ACCEPT:
                    throw new ValidationException("Không thể thay đổi trạng thái đơn hàng sau khi chấp thuận đơn hàng!");
                case CUSTOMER_REJECT:
                    throw new ValidationException("Không thể thay đổi trạng thái đơn hàng sau khi đã huỷ!");
                case STAFF_REJECT:
                    throw new ValidationException("Đơn hàng đã bị từ chối bởi shop!");
            }
            // Can't add when new activity is same last activity
            if (activities.stream().anyMatch(act -> act.getActivityName().equals(activityIn))) {
                throw new ValidationException("Trạng thái order phải khác trạng thái trước!");
            }
        }

        OrderActivity activity = OrderActivity.builder()
                .order(order)
                .date(new Date())
                .activityName(activityIn)
                .assigner(assigner)
                .build();
        return orderActivityRepos.save(activity);
    }

    @Override
    public boolean updateOrderActivity(HttpServletRequest req, OrderActivityEnum activityEnum, Long orderId) {
        if (orderId == null) {
            throw new ValidationException("Vui lòng chọn đơn hàng!");
        }
        if (activityEnum == null) {
            throw new ValidationException("Vui lòng chọn trạng thái");
        }
        User staff = userRepos.findByPhone(jwtTokenProvider.getUsername(jwtTokenProvider.resolveToken(req)));
        Optional<Order> order = orderRepos.findById(orderId);
        if (!order.isPresent()) {
            throw new ValidationException("Không tìm thấy đơn hàng này!");
        }
        OrderActivity activity = switchActivity(order.get(), activityEnum, staff);
        if (activity != null) {
            if (activityEnum.equals(OrderActivityEnum.STAFF_REJECT)) {
                returnQuantityCancelOrder(order.get());
            }
            return true;
        }
        return false;
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
        for (Order order : list) {
            AdminOrderDtoOut.OrderDtoOut dtoOut = mapper.map(order, AdminOrderDtoOut.OrderDtoOut.class);
            dtoOut.setActivities(getOrderActivities(order));
            List<OrderLine> orderLineList = orderLineRepos.findByOrder_OrderId(order.getOrderId());
            if (orderLineList != null) {
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
                    .orders(mapCustomData(list.getContent()))
                    .build();
            //trả về kết quả
            return Optional.of(result);
        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }
}
