package fpt.custome.yourlure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tbl_Variants")
public class Variant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "variantId")
    private Long variantId;

    @Nullable
    @Column(name = "variantName")
    private String variantName;

    @Nullable
    @Column(name = "quantity")
    private Integer quantity;

    @NotNull
    @Column(name = "newPrice")
    private Float newPrice;

    @Nullable
    @Column(name = "imageUrl")
    private String imageUrl;

//    @NotNull
//    @Column(name = "visibleInStorefront", nullable = false)
//    private Boolean visibleInStorefront;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "productId", nullable = false)
    private Product product;

}
