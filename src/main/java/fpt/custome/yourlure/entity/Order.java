package fpt.custome.yourlure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_Orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderId")
    private Long orderId;

    @Nullable
    @Column(name = "orderDate")
    private Date orderDate;

    @Nullable
    @Column(name = "address")
    private String address;

    @Nullable
    @Column(name = "phone")
    private String phone;

    @Nullable
    @Column(name = "receiverName")
    private String receiverName;

    @Nullable
    @Column(name = "note")
    private String note;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "paymentId", nullable = false)
    private Payment payment;

    @JsonIgnore
    @ManyToOne
    @Nullable
    @JoinColumn(name = "userId")
    private User user;

    // todo: sua discountID thanh discount code. de khi xoa discountId van ko anh houng toi order
    private String discountVoucher;

    @JsonIgnore
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    // MapopedBy trỏ tới tên biến order ở trong orderline.
    //1 order có nhiều orderline
    private Collection<OrderLine> orderLineCollection;

}
