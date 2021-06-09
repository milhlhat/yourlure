package fpt.custome.yourlure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tbl_Variants")
public class Variant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

}
