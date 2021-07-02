package fpt.custome.yourlure.dto.dtoOut;

import fpt.custome.yourlure.entity.Category;
import fpt.custome.yourlure.entity.Image;
import lombok.*;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AdminOrderDetailDtoOut {

    private Long orderID;
    private String address;
    private String phone;
    private String name;
    private String note;
    private Date orderDate;
    private String activityName;
    List<ProductDtoOut> productDtoOuts;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class ProductDtoOut {
        private String productName;
        private Category category;
        private Long variantId;
        private Integer quantity;
        private Float price;
        private Collection<Image> imageCollection;
        private String thumbnailUrl;
        private Long customizeId;
    }
}
