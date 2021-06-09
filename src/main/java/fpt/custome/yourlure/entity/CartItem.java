package fpt.custome.yourlure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.Nullable;

import javax.persistence.*;

@Entity
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Nullable
    @Column(name = "productId")
    private Long productId;

    @Nullable
    @Column(name = "variantId")
    private Long variantId;

    @Nullable
    @Column(name = "quantity")
    private Integer quantity;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "cartID", nullable = false)
    private Cart cart;
}
