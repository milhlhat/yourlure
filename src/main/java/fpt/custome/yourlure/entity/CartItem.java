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
@Table(name = "tbl_CartItem")
public class CartItem {

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
    private Integer quantity;

    @Nullable
    @Column(name = "weight")
    private Float weight;

    @Nullable
    @Column(name = "imgUrl")
    private String imgUrl;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "cartID", nullable = false)
    private Cart cart;
}
