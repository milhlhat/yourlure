package fpt.custome.yourlure.dto.dtoInp;

import fpt.custome.yourlure.entity.Image;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductsDtoInp {

    private Long productId;
    private String productName;
    private Float defaultPrice;
    private String description;
    private String content;
    private Float minWeight;
    private Float defaultWeight;
    private Float maxWeight;
    private Float length;
    private String material;
    private Float hookSize;
    private String deepDiving;
    private Boolean customizable;
    private String brand;
    private Date dateCreate;
    private String imgUrlModel;
    private Long categoryId;
    private Long fishId;
    private Collection<Image> imageCollection;

}
