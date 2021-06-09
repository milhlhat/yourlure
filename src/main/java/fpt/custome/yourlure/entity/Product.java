package fpt.custome.yourlure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_Products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "productID")
    private Long productID;

    @Nullable
    @Column(name = "productName")
    private String productName;

    @Nullable
    @Column(name = "defaultPrice")
    private Float defaultPrice;

    @Nullable
    @Column(name = "description")
    private String description;

    @Nullable
    @Column(name = "brand")
    private String brand;

    @Nullable
    @Column(name = "sale")
    private Float sale;

    @Nullable
    @Column(name = "customizable")
    private Boolean customizable;

    @Nullable
    @Column(name = "dateCreate")
    private Date dateCreate;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "categoryID", nullable = false)
    private Category category;

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    // MapopedBy trỏ tới tên biến products ở trong Images .
    //1 product có nhiều image
    private Collection<Image> imageCollection;

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    // MapopedBy trỏ tới tên biến products ở trong variants .
    //1 product có nhiều variants
    private Collection<Variant> variantCollection;

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    // MapopedBy trỏ tới tên biến products ở trong variants .
    //1 product có nhiều variants
    private Collection<Customize> customizeCollection;

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    // MapopedBy trỏ tới tên biến products ở trong fish_product.
    //1 category có nhiều product
    private Collection<Fish_product> productsCollection;
}
