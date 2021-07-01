package fpt.custome.yourlure.dto.dtoInp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderUserDtoInput {

    private String address;
    private String note;
    private Long paymentId;

    public String discountCode;
    public List<Long> cartItemIds;
}
