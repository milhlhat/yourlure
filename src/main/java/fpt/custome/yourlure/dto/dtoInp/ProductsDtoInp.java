package fpt.custome.yourlure.dto.dtoInp;

import fpt.custome.yourlure.entity.*;
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

    private Long productID;
    private String productName;
    private Category category;
    private Image image;
    private float defaultPrice;
    private String description;
    private String brand;
    private Float sale;
    private boolean customizable;
    private Date dateCreate;
    private Collection<Variant> variantCollection;
    private Collection<Customize> customizeCollection;
    private Collection<Fish_product> productsCollection;
}
