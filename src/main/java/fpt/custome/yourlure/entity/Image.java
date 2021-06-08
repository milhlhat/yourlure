package fpt.custome.yourlure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import com.sun.istack.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Data
@Builder
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

    @JsonIgnore
    @NotNull
    @OneToMany(mappedBy = "image", cascade = CascadeType.ALL)
    // Quan hệ 1-n với đối tượng ở dưới (Product) (1 product có nhiều ảnh)
    private Collection<Product> productCollection;
}