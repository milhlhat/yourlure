package fpt.custome.yourlure.dto.dtoInp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Size;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddToCartDto {

    private Long productId;
    private Long variantId;
    @Size(min = 1, max = 20)
    private Integer quantity;
    private Float weight;
    private Long customModelId;


}
