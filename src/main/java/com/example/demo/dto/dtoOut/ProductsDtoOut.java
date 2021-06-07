package com.example.demo.dto.dtoOut;

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
public class ProductsDtoOut {

    private Long productID;
    private String productName;
    private Long categoryId;
    private String imageUrl;
    private Float defaultPrice;
    private String description;
    private String brand;
    private Float sale;
    private Boolean customizable;
    private Date dateCreate;
    private Collection<Variant> variantCollection;
    private Collection<Customize> customizeCollection;
    private Collection<Fish_product> productsCollection;
}
