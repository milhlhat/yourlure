package fpt.custome.yourlure.dto.dtoOut;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartDtoOut {

    private List<CartItemDtoOut> cartItems;


    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CartItemDtoOut {

        private Long cartItemId;
        private Long customModelId;
        private String thumbnailUrl;
        private String customizeName;
        private Long productId;
        private String productName;
        private Integer quantity;
        private Integer variantQuantity;
        private Long variantId;
        private String variantName;
        private String variantImg;
        private Boolean visibleInStorefront;
        private Float weight;
        private Float price;

    }
}
