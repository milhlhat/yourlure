package fpt.custome.yourlure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Min;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tbl_CartItem")
public class CartItem {

    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cartItemId")
    private Long cartItemId;

    @Nullable
    @Column(name = "productId")
    private Long productId;

    @Nullable
    @Column(name = "variantId")
    private Long variantId;

    @Nullable
    @Column(name = "quantity")
    @Min(1)
    private Integer quantity;

    @Nullable
    @Column(name = "weight")
    private Float weight;

    @Nullable
    @Column(name = "customModelId")
    private Long customModelId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "cartId", nullable = false)
    private Cart cart;
}
