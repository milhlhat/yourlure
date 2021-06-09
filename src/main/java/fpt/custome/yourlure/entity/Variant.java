package fpt.custome.yourlure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Column(name = "backgroundColor")
    private String backgroundColor;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "productID", nullable = false)
    private Product product;

    @JsonIgnore
    @OneToMany(mappedBy = "variant", cascade = CascadeType.ALL)
    // MapopedBy trỏ tới tên biến variants ở trong orderline.
    //1 variants có nhiều orderline
    private Collection<OrderLine> orderLineCollection;


}
