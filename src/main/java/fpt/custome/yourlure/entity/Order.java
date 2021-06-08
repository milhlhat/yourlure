package fpt.custome.yourlure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_Orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "orderID")
    private Long orderID;

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
    @Column(name = "name")
    private String name;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "paymentID", nullable = false)
    private Payment payment;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "userID", nullable = false)
    private User User;

}
