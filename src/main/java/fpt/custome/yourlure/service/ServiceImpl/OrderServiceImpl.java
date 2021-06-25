package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoOut.OrderDetailDtoOut;
import fpt.custome.yourlure.dto.dtoOut.OrderDtoOut;
import fpt.custome.yourlure.entity.*;
import fpt.custome.yourlure.repositories.*;
import fpt.custome.yourlure.service.OrderService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class OrderServiceImpl implements OrderService {

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
    public List<OrderDtoOut> getAll(Pageable pageable) {
        List<OrderDtoOut> results = new ArrayList<>();
        try {
            Page<Order> list = orderRepos.findAll(pageable);
            orderRepos.findAll(pageable);
            for (Order item : list) {
                OrderDtoOut dtoOut = mapper.map(item, OrderDtoOut.class);
                OrderActivity orderActivity = orderActivityRepos.findByOrder_OrderId(item.getOrderId());
                dtoOut.setStatusName(orderActivity.getActivityName());
                List<OrderLine> orderLineList = orderLineRepos.findByOrder_OrderId(item.getOrderId());
                float total = 0;
                for (OrderLine orderLine : orderLineList) {
                    total += orderLine.getPrice() * orderLine.getQuantity();
                }
                dtoOut.setTotal(total);
                results.add(dtoOut);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return results;
    }

    @Override
    public Optional<OrderDetailDtoOut> getById(Long id) {
        try {
            Optional<Order> optional = orderRepos.findById(id);
            List<OrderDetailDtoOut.ProductDtoOut> productDtoOutList = new ArrayList<>();
            if (optional.isPresent()) {
                OrderDetailDtoOut result = mapper.map(optional.get(), OrderDetailDtoOut.class);
                List<OrderLine> orderLineList = (List<OrderLine>) optional.get().getOrderLineCollection();
                for (OrderLine item : orderLineList) {
                    OrderDetailDtoOut.ProductDtoOut productDtoOut = mapper.map(
                            productJpaRepos.findById(item.getProductId()), OrderDetailDtoOut.ProductDtoOut.class);
                    productDtoOut.builder()
                            .price(item.getPrice())
                            .quantity(item.getQuantity())
                            .variantId(item.getVariantId())
                            //TODO: truy van customize trong bang customize roi gan vao
//                            .customizeId(item.getCustomize())
                            .thumbnailUrl(item.getTextureImg())
                            .build();
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
        } catch (
                Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
