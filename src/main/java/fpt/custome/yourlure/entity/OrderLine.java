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
    @Column(name = "sale")
    private Float sale;

    @NotNull
    @JoinColumn(name = "variantId")
    private Long variantId;

    @Nullable
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "customizeId")
    private Customize customize;

    @Nullable
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "oderId", nullable = false)
    private Order order;

}
