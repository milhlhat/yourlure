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
public class AdminDiscountVoucherDtoOut {


    private Integer totalItem;
    private Integer totalPage;
    private List<DiscountVoucherDtoOut> discountVouchers;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class DiscountVoucherDtoOut {
        private Long discountVoucherId;
        private String name;
        private String type;
        private String code;
        private Date start_date;
        private Date end_date;
        private Float discountValue;
        private Float maxValue;

    }


}
