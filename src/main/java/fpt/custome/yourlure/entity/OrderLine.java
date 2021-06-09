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
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "orderLineID")
    private Long orderLineID;

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
    @JoinColumn(name = "variantID")
    private Long variantID;

    @Nullable
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "customizeID")
    private Customize customize;

    @Nullable
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "oderID", nullable = false)
    private Order order;

}
