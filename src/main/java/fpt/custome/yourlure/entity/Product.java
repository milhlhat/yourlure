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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productId")
    private Long productId;

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
    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Nullable
    @Column(name = "minWeight")
    private Float minWeight;

    @Nullable
    @Column(name = "weight")
    private Float defaultWeight;

    @Nullable
    @Column(name = "maxWeight")
    private Float maxWeight;

    @Nullable
    @Column(name = "length")
    private Float length;

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
    @Column(name = "customizable")
    private Boolean customizable;

    @Nullable
    @Column(name = "brand")
    private String brand;

    @Nullable
    @Column(name = "visibleInStorefront")
    private Boolean visibleInStorefront;

    @Nullable
    @Column(name = "dateCreate")
    private Date dateCreate;

    @Nullable
    @Column(name = "imgUrlModel")
    private String imgUrlModel;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "categoryId", nullable = false)
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
    // MapopedBy trỏ tới tên biến products ở trong Customize .
    //1 product có nhiều Customize
    private Collection<Customize> customizeCollection;

}
