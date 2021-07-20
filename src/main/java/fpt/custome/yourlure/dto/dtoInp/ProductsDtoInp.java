package fpt.custome.yourlure.dto.dtoInp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductsDtoInp {

    private String productName;
    private Float defaultPrice;
    private String description;
    private String content;
    private Boolean isCustomizeWeight;
    private Boolean visibleInStorefront;
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
    private List<Long> listFishId;
    private List<String> imgListInput;
    private List<String> imgListRemove;

}
