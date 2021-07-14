package fpt.custome.yourlure.dto.dtoOut;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DiscountVoucherDtoOutput {

    private String type;
    private Float discountValue;
    private Float maxValue;
    private Float minSpentAmount;
}
