package fpt.custome.yourlure.dto.dtoInp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VariantDtoInput {

    private String backgroundColor;
    private Integer quantity;
    private Float newPrice;
    private String imageUrl;
    private Long productId;

}
