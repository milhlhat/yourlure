package fpt.custome.yourlure.dto.dtoInp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddToCartDto {

    private Long productId;
    private Long variantId;
    private Integer quantity;
    private Float weight;
    private Long customModelId;


}
