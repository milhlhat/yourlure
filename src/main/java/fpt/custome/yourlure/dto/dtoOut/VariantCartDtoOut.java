package fpt.custome.yourlure.dto.dtoOut;


import fpt.custome.yourlure.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VariantCartDtoOut {

        private String variantName;
        private Integer variantQuantity;
        private Float newPrice;
        private String imageUrl;
        private Product product;
    }

