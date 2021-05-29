package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_Products")
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "productID")
    private Long productID;

    @Nullable
    @Column(name = "productName")
    private String productName;

    @ManyToOne
    @JoinColumn(name = "categoryID", nullable = false)
    private Category category;

    @ManyToOne
    @JoinColumn(name = "imageID", nullable = false)
    private Image image;

    @OneToMany(mappedBy = "products", cascade = CascadeType.ALL)
    // MapopedBy trỏ tới tên biến products ở trong variants .
    //1 product có nhiều variants
    private Collection<Variants> variantsCollection;

    @OneToMany(mappedBy = "products", cascade = CascadeType.ALL)
    // MapopedBy trỏ tới tên biến products ở trong variants .
    //1 product có nhiều variants
    private Collection<Customize> customizeCollection;

    // mappedBy trỏ tới tên biến productCollection ở trong Fish.
    @ManyToMany(mappedBy = "productCollection")
    private Collection<Fish> fishCollection;

    @Nullable
    @Column(name = "defaultPrice")
    private float defaultPrice;

    @Nullable
    @Column(name = "description")
    private String description;

    @Nullable
    @Column(name = "brand")
    private String brand;

    @Nullable
    @Column(name = "sale")
    private int sale;

    @Nullable
    @Column(name = "customizable")
    private boolean customizable;

    @Nullable
    @Column(name = "dateCreate")
    private Date dateCreate;

}
