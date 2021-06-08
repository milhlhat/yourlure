package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Collection;

@Data
@Entity
@Builder
@Table(name = "tbl_Cart")
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "cartID")
    private Long cartID;

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "userID", referencedColumnName = "cartID")
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "variant", cascade = CascadeType.ALL)
    // MapopedBy trỏ tới tên biến variant ở trong Variant.
    //1 cart có nhiều variant
    private Collection<Variant> variantCollection;
}
