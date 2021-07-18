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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    @Nullable
    private User user;

    // todo: discount by % lúc nhận request là discount code. tính toán để có discount số tiền.
    private Float discount;


    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    // MapopedBy trỏ tới tên biến order ở trong orderline.
    //1 order có nhiều orderline
    private Collection<OrderLine> orderLineCollection;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    // MapopedBy trỏ tới tên biến order ở trong orderline.
    //1 order có nhiều orderline
    private Collection<OrderActivity> activities;


}
