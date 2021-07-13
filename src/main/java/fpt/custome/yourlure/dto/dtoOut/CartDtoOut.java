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
    public static class CartItemDtoOut{

        private Long productId;

    }
}
