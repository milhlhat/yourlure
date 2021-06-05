package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "fishID", nullable = false)
    private Fish fish;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "productID", nullable = false)
    private Product product;


}
