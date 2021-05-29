package com.example.demo.entity;

import com.sun.istack.NotNull;
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
@Table(name = "tbl_Image")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Nullable
    @Column(name = "linkImage")
    private String linkImage;

    @NotNull
    @OneToMany(mappedBy = "image", cascade = CascadeType.ALL)
    // Quan hệ 1-n với đối tượng ở dưới (Product) (1 product có nhiều ảnh)
    private Collection<Products> productsCollection;
}
