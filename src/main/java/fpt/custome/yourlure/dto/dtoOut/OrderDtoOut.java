package fpt.custome.yourlure.dto.dtoOut;

import fpt.custome.yourlure.entity.OrderActivity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderDtoOut {

    private long totalItem;
    private Integer totalPage;
    private List<OrderDtoOut.Order> orders;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Order{
        private Long orderId;
        private String orderCode;
        private Date orderDate;
        private Long userId;
        private String address;
        private String phone;
        private String receiverName;
        private String note;
        private String paymentName;
        private Float discount;
        private Collection<OrderActivity> activities;
        private List<OrderDtoOut.OrderItem> items;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItem{

        private String thumbnailUrl;
        private Long customModelId;
        private String customModelName;
        private String productId;
        private String productName;
        private Boolean visibleInStorefront;
        private String categoryName;
        private Integer quantity;
        private String variantName;
        private Float weight;
        private Float price;

    }
}