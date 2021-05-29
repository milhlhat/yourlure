package com.example.demo.entity;

import com.sun.istack.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_OrderLine")
public class OrderLine {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "orderLineID")
    private Long orderLineID;

    @ManyToOne
    @JoinColumn(name = "oderID", nullable = false)
    private Orders orders;

    @ManyToOne
    @JoinColumn(name = "variantID")
    private Variants variants;

    @Nullable
    @Column(name = "quantity")
    private int quantity;

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
    @JoinColumn(name = "customizeID", nullable = false)
    private Customize customize;


}
