package fpt.custome.yourlure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.Nullable;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "tbl_DiscountSale")
public class DiscountSale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "discountSaleId")
    private Long discountSaleId;

    @Nullable
    @Column(name = "name")
    private String name;

    @Nullable
    @Column(name = "type")
    private String type;

    @Nullable
    @Column(name = "value")
    private Integer value;

    @Nullable
    @Column(name = "start_date")
    private Date start_date;

    @Nullable
    @Column(name = "end_date")
    private Date end_date;

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "tbl_discount_sale_product", //Tạo ra một join Table tên là "tbl_discount_sale_product"
            joinColumns = @JoinColumn(name = "discountSaleId"),  // TRong đó, khóa ngoại chính là discountSaleId trỏ tới class hiện tại (Address)
            inverseJoinColumns = @JoinColumn(name = "productId") //Khóa ngoại thứ 2 trỏ tới thuộc tính ở dưới (product)
    )
    private Set<Product> products = new HashSet<>();

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "tbl_discount_sale_category", //Tạo ra một join Table tên là "tbl_discount_sale_category"
            joinColumns = @JoinColumn(name = "discountSaleId"),  // TRong đó, khóa ngoại chính là discountSaleId trỏ tới class hiện tại (Address)
            inverseJoinColumns = @JoinColumn(name = "categoryId") //Khóa ngoại thứ 2 trỏ tới thuộc tính ở dưới (category)
    )
    private Set<Category> categories = new HashSet<>();

}
