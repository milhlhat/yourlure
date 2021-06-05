package com.example.demo.entity;

import com.sun.istack.Nullable;
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
    private long variantID;

    @Nullable
    @Column(name = "variantsType")
    private String variantsType;

    @Nullable
    @Column(name = "length")
    private float length;

    @Nullable
    @Column(name = "weight")
    private float weight;

    @Nullable
    @Column(name = "material")
    private String material;

    @Nullable
    @Column(name = "hookSize")
    private float hookSize;

    @Nullable
    @Column(name = "deepDiving")
    private float deepDiving;

    @Nullable
    @Column(name = "newPrice")
    private float newPrice;

    @Nullable
    @Column(name = "quantity")
    private int quantity;

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
