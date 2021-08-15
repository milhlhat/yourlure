package fpt.custome.yourlure.dto.dtoInp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddToCartDto {

    private Long variantId;
    @Min(1)
    @Max(50)
    private Integer quantity;
    private Float weight;
    private Long customModelId;


}
