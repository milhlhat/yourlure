package fpt.custome.yourlure.dto.dtoOut;

import fpt.custome.yourlure.entity.Category;
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
public class AdminProductDtoOut {

    private Integer totalProduct;
    private Integer totalPage;
    private List<ProductOutput> productOutputList;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ProductOutput {
        private Long productId;
        private String productName;
        private Boolean visibleInStorefront;
        private Category category;
        private Collection<Image> imageCollection;

    }

}
