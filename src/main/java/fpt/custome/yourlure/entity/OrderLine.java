package fpt.custome.yourlure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import com.sun.istack.Nullable;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

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
    @Min(value = 1)
    @Max(value = 50)
    private Integer quantity;

    @Nullable
    @Column(name = "price")
    private Float price;

    @Nullable
    @Column(name = "weight")
    private Float weight;

    @Nullable
    @Column(name = "imgThumbnail")
    private String imgThumbnail;

    @NotNull
    @JsonIgnore
    @Column(name = "productId")
    private Long productId;

    @NotNull
    @Column(name = "productName")
    private String productName;

    @Nullable
    @JsonIgnore
    @Column(name = "variantId")
    private Long variantId;

    @NotNull
    @Column(name = "variantName")
    private String variantName;

    @Nullable
    @JsonIgnore
    @Column(name = "customModelId")
    private Long customModelId;

    @NotNull
    @Column(name = "customModelName")
    private String customModelName;

    @Nullable
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orderId", nullable = false)
    private Order order;

}
