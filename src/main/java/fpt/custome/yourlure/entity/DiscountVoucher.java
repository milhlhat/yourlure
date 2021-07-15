package fpt.custome.yourlure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
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

    @NotNull
    @Column(name = "name")
    private String name;

    /**
     * Số Tiền Cố Định
     * Tỷ Lệ Phần Trăm
     * Miễn Phí Vận Chuyển
     */
    @NotNull
    @Column(name = "type")
    private String type;

    @NotNull
    @Column(name = "code", unique = true)
    private String code;

    @Nullable
    @Column(name = "usageLimit")
    private Integer usageLimit;

    @Nullable
    @Column(name = "used")
    private Integer used;

    @NotNull
    @Column(name = "start_date")
    private Date start_date;

    @NotNull
    @Column(name = "end_date")
    private Date end_date;

    @NotNull
    @Column(name = "discountValue")
    private Float discountValue;

    @NotNull
    @Column(name = "maxValue")
    private Float maxValue;

    @NotNull
    @Column(name = "minSpentAmount")
    private Float minSpentAmount;

    @Nullable
    @Column(name = "minCheckoutItemsQuantity")
    private Integer minCheckoutItemsQuantity;

    @Nullable
    @Column(name = "applyOncePerCustomer")
    private Integer applyOncePerCustomer;

    // todo: xoa cai noi voi product category. ap dung discount voi tat ca ko phan biet

    @JsonIgnore
    @OneToMany(mappedBy = "discountVoucher", cascade = CascadeType.ALL)
    // MapopedBy trỏ tới tên biến discountVoucher ở trong DiscountVoucherCustomer.
    //1 discountVoucher có nhiều DiscountVoucherCustomer
    private Collection<DiscountVoucherCustomer>     discountVoucherCustomers;
}
