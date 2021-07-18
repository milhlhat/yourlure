package fpt.custome.yourlure.dto.dtoOut;

import fpt.custome.yourlure.entity.OrderActivity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdminOrderDtoOut {

    private Integer totalOrder;
    private Integer totalPage;
    private List<OrderDtoOut> orders;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class OrderDtoOut {
        private Long orderId;
        private Date orderDate;
        private String phone;
        private String receiverName;
        private List<OrderActivity> activities;
        private Float total;
    }

}
