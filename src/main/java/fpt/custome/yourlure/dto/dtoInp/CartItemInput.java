package fpt.custome.yourlure.dto.dtoInp;

import fpt.custome.yourlure.entity.Customize;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartItemInput {

    private Long Id;
    private Long productID;
    private Long variantID;
    private Long userID;
    private Integer quantity;
    private Float weight;
    private Customize customize;
}
