package fpt.custome.yourlure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.Nullable;
import lombok.*;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "tbl_DiscountVoucher")
public class DiscountVoucher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "discountVoucherId")
    private Long discountVoucherId;

    @Nullable
    @Column(name = "name")
    private String name;

    /**
     * Số Tiền Cố Định
     * Tỷ Lệ Phần Trăm
     * Miễn Phí Vận Chuyển
     */
    @Nullable
    @Column(name = "type")
    private String type;

    @Nullable
    @Column(name = "code")
    private String code;

    @Nullable
    @Column(name = "usageLimit")
    private Integer usageLimit;

    @Nullable
    @Column(name = "used")
    private Integer used;

    @Nullable
    @Column(name = "start_date")
    private Date start_date;

    @Nullable
    @Column(name = "end_date")
    private Date end_date;

    @Nullable
    @Column(name = "discountValue")
    private Integer discountValue;

    @Nullable
    @Column(name = "minSpentAmount")
    private Integer minSpentAmount;

    @Nullable
    @Column(name = "minCheckoutItemsQuantity")
    private Integer minCheckoutItemsQuantity;

    @Nullable
    @Column(name = "applyOncePerCustomer")
    private Integer applyOncePerCustomer;

    // todo: xoa cai noi voi product category. ap dung discount voi tat ca ko phan biet

    @JsonIgnore
    @OneToMany(mappedBy = "discountVoucher", cascade = CascadeType.ALL)
    // MapopedBy trỏ tới tên biến discountVoucher ở trong Order.
    //1 discountVoucher có nhiều Order
    private Collection<Order> orderCollection;

    @JsonIgnore
    @OneToMany(mappedBy = "discountVoucher", cascade = CascadeType.ALL)
    // MapopedBy trỏ tới tên biến discountVoucher ở trong DiscountVoucherCustomer.
    //1 discountVoucher có nhiều DiscountVoucherCustomer
    private Collection<DiscountVoucherCustomer> discountVoucherCustomers;
}
