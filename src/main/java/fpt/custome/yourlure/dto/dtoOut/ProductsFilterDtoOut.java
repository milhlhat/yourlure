package fpt.custome.yourlure.dto.dtoOut;

import fpt.custome.yourlure.entity.Image;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductsFilterDtoOut {

    private List<ProductsFilterDtoOut.ProductOut> productOutList;
    private Integer totalPage;
    private Integer totalProduct;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ProductOut {

        private Long productID;
        private String productName;
        private Collection<Image> imageCollection;
        private Float defaultPrice;

    }
}
