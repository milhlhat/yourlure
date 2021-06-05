package com.example.demo.entity;

import com.sun.istack.Nullable;
import io.swagger.models.auth.In;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Collection;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tbl_Variants")
public class Variant {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "variantID")
    private Long variantID;

    @Nullable
    @Column(name = "variantsType")
    private String variantsType;

    @Nullable
    @Column(name = "length")
    private Float length;

    @Nullable
    @Column(name = "weight")
    private Float weight;

    @Nullable
    @Column(name = "material")
    private String material;

    @Nullable
    @Column(name = "hookSize")
    private Float hookSize;

    @Nullable
    @Column(name = "deepDiving")
    private String deepDiving;

    @Nullable
    @Column(name = "newPrice")
    private Float newPrice;

    @Nullable
    @Column(name = "quantity")
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "productID", nullable = false)
    private Product product;

    @OneToMany(mappedBy = "variants", cascade = CascadeType.ALL)
    // MapopedBy trỏ tới tên biến variants ở trong orderline.
    //1 variants có nhiều orderline
    private Collection<OrderLine> orderLineCollection;

    @Column(name = "backgroundColor")
    private String backgroundColor;

}
