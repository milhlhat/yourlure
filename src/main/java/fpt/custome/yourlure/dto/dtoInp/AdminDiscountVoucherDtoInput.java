package fpt.custome.yourlure.dto.dtoInp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminDiscountVoucherDtoInput {

    private String name;
    private String type;
    private Integer usageLimit;
    private Date start_date;
    private Date end_date;
    private Float discountValue;
    private Float minSpentAmount;
    private Float maxValue;

}
