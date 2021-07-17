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
        private Date orderDate;
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
        private String customizeName;
        private String productName;
        private String categoryName;
        private Integer quantity;
        private String variantName;
        private Float weight;
        private Float price;

    }
}
