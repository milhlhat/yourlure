package fpt.custome.yourlure.dto.dtoInp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddToCartDto {

    private Long productId;
    private Long variantId;
    @Min(1)
    private Integer quantity;
    private Float weight;
    private Long customModelId;


}
