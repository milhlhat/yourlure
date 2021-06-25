package fpt.custome.yourlure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import com.sun.istack.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_OrderLine")
public class OrderLine {

    @Id
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

    @NotNull
    @Column(name = "productId")
    private Long productId;

    @Nullable
    @Column(name = "variantId")
    private Long variantId;

    @Nullable
    @Column(name = "headColor")
    private String headColor;

    @Nullable
    @Column(name = "bodyColor")
    private String bodyColor;

    @Nullable
    @Column(name = "eyeColor")
    private String eyeColor;

    @Nullable
    @Column(name = "tailColor")
    private String tailColor;

    @Nullable
    @Column(name = "backColor")
    private String backColor;

    @Nullable
    @Column(name = "hookColor")
    private String hookColor;

    @Nullable
    @Column(name = "textureImg")
    private String textureImg;

    @Nullable
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "oderId", nullable = false)
    private Order order;

}
