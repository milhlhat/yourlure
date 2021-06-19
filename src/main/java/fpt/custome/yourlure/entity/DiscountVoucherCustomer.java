package fpt.custome.yourlure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.Nullable;
import lombok.*;

import javax.persistence.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "tbl_DiscountVoucherCustomer")
public class DiscountVoucherCustomer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "discountVoucherCustomerId")
    private Long discountVoucherCustomerId;

    @Nullable
    @Column(name = "phone")
    private String phone;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "discountVoucherId")
    private DiscountVoucher discountVoucher;

}
