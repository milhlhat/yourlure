package fpt.custome.yourlure.dto.dtoOut;

import fpt.custome.yourlure.entity.Image;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductsDetailDtoOut {

    private Long productID;
    private String productName;
    private Collection<Image> imageCollection;
    private Float defaultPrice;
    private String description;
    private String brand;
    private Boolean customizable;

}
