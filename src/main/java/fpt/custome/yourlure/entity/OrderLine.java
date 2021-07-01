package fpt.custome.yourlure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import com.sun.istack.Nullable;
import lombok.*;

import javax.persistence.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "tbl_OrderLine")
public class OrderLine {


    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderLineId")
    private Long orderLineId;

    @Nullable
    @Column(name = "quantity")
    private Integer quantity;

    @Nullable
    @Column(name = "price")
    private Float price;

    @Nullable
    @Column(name = "weight")
    private Integer weight;

    @Nullable
    @Column(name = "imgThumbnail")
    private String imgThumbnail;

    @NotNull
    @JsonIgnore
    @Column(name = "productId")
    private Long productId;

    @Nullable
    @JsonIgnore
    @Column(name = "variantId")
    private Long variantId;

    @Nullable
    @JsonIgnore
    @Column(name = "customModelId")
    private Long customModelId;

    @Nullable
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "oderId", nullable = false)
    private Order order;

}
