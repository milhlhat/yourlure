package com.example.demo.entity;

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
public class Orders {

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

    @ManyToOne
    @JoinColumn(name = "paymentID", nullable = false)
    private Payment payment;

    @ManyToOne
    @JoinColumn(name = "userID", nullable = false)
    private Users Users;

}
