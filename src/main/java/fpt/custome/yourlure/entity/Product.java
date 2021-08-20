package fpt.custome.yourlure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fpt.custome.yourlure.dto.dtoInp.ProductsDtoInp;
import fpt.custome.yourlure.entity.customizemodel.Model3d;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
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

    @NotNull
    @Column(name = "productName")
    private String productName;

    @NotNull
    @Column(name = "defaultPrice")
    private Float defaultPrice;

    @Nullable
    @Column(name = "nonColorPrice")
    private Float nonColorPrice;

    @Nullable
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Nullable
    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @NotNull
    @Column(name = "isCustomizeWeight", nullable = false)
    private Boolean isCustomizeWeight;

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

    @NotNull
    @Column(name = "customizable", nullable = false, columnDefinition = "bool default false")
    private Boolean customizable;

    @JsonIgnore
    @OneToOne(mappedBy = "product", cascade = CascadeType.REMOVE)
    private Model3d model3d;

    @Nullable
    @Column(name = "brand")
    private String brand;

    @NotNull
    @Column(name = "visibleInStorefront", nullable = false)
    private Boolean visibleInStorefront;

    @Nullable
    @Column(name = "dateCreate")
    private Date dateCreate;

    @Nullable
    @Column(name = "imgUrlModel")
    private String imgUrlModel;

    @Nullable
    @Column(name = "imgUrlFillText")
    private String imgUrlFillText;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "categoryId", nullable = false)
    private Category category;

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE)
    // MapopedBy trỏ tới tên biến products ở trong Images .
    //1 product có nhiều image
    private Collection<Image> imageCollection;

    @JsonIgnore
    @OrderBy("variantId ASC")
    @OneToMany(mappedBy = "product",cascade = CascadeType.REMOVE, orphanRemoval = true)
    // MapopedBy trỏ tới tên biến products ở trong variants .
    //1 product có nhiều variants
    private Collection<Variant> variantCollection;

    @OrderBy("fishId asc")
    @ManyToMany(mappedBy = "products",cascade = CascadeType.REMOVE)
    private Collection<Fish> fishList = new ArrayList<>();

    /**
     * add fish to product
     *
     * @param f
     */
    public void addFish(Fish f) {
        this.fishList.add(f);
        f.getProducts().add(this);
    }

    /**
     * remove fish on product
     *
     * @param f
     */
    public void removeFish(Fish f) {
        this.fishList.remove(f);
        f.getProducts().remove(this);
    }

    public void update(ProductsDtoInp productsDtoInp) {
        this.brand = productsDtoInp.getBrand();
        this.content = productsDtoInp.getContent();
        this.customizable = productsDtoInp.getCustomizable();
        this.deepDiving = productsDtoInp.getDeepDiving();
        this.defaultPrice = productsDtoInp.getDefaultPrice();
        this.defaultWeight = productsDtoInp.getDefaultWeight();
        this.isCustomizeWeight = productsDtoInp.getIsCustomizeWeight();
        this.visibleInStorefront = productsDtoInp.getVisibleInStorefront();
        this.description = productsDtoInp.getDescription();
        this.hookSize = productsDtoInp.getHookSize();
        this.productName = productsDtoInp.getProductName();
        this.imgUrlModel = productsDtoInp.getImgUrlModel();
        this.length = productsDtoInp.getLength();
        this.material = productsDtoInp.getMaterial();
        this.maxWeight = productsDtoInp.getMaxWeight();
        this.minWeight = productsDtoInp.getMinWeight();
    }

}
