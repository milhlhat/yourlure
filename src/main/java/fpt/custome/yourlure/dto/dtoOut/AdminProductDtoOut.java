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
public class AdminProductDtoOut {

    private Long productId;
    private String productName;
    private Boolean visibleInStorefront;
    private String categoryName;
    private Collection<Image> imageCollection;

}
