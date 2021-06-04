package com.example.demo.dto.dtoInp;

import com.example.demo.entity.*;
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
    private Collection<Variants> variantsCollection;
    private Collection<Customize> customizeCollection;
    private Collection<Fish_product> productsCollection;
}
