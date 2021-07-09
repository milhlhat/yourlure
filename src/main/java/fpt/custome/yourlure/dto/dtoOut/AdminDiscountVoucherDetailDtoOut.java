package fpt.custome.yourlure.dto.dtoOut;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminDiscountVoucherDetailDtoOut {

    private Long discountVoucherId;
    private String name;
    private String type;
    private String code;
//    private Integer usageLimit;
//    private Integer used;
    private Date start_date;
    private Date end_date;
    private Integer discountValue;
    private Integer minSpentAmount;
    private Integer minCheckoutItemsQuantity;
//    private Integer applyOncePerCustomer;

}
