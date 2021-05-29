package com.example.demo.entity;

import com.sun.istack.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_Category")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "paymentID")
    private Long paymentID;

    @Nullable
    @Column(name = "payment")
    private String payment;

    @OneToMany(mappedBy = "payment", cascade = CascadeType.ALL)
    // MapopedBy trỏ tới tên biến payment ở trong Orders.
    //1 payment có nhiều Orders
    private Collection<Orders> ordersCollection;
}
