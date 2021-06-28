package fpt.custome.yourlure.dto.dtoOut;

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
    private List<OrderDtoOut> orderDtoOutList;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class OrderDtoOut {
        private Long orderID;
        private Date orderDate;
        private String phone;
        private String name;
        private String statusName;
        private Float total;
    }

}
