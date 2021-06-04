package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Builder
@Table(name = "tbl_Fish_product")
@NoArgsConstructor
@AllArgsConstructor
public class Fish_product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "fish_productID")
    private Long fish_productID;

    @ManyToOne
    @JoinColumn(name = "fishID", nullable = false)
    private Fish fish;

    @ManyToOne
    @JoinColumn(name = "productID", nullable = false)
    private Products products;


}
