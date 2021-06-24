package fpt.custome.yourlure.dto.dtoInp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartItemInput {

    private Long imageUrl;
    private Float price;
    private Long productId;
    private Long variantId;
    private Long cartId;
    private Integer quantity;
    private Float weight;
    private CustomizeDtoInput customizeDtoInput;

}
