package com.example.demo.entity;

import com.sun.istack.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Builder
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
    @Column(name = "price")
    private int price;

    @Nullable
    @Column(name = "sale")
    private Float sale;

    @ManyToOne
    @JoinColumn(name = "customizeID", nullable = false)
    private Customize customize;


}
