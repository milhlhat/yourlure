package fpt.custome.yourlure.entity.customizemodel;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fpt.custome.yourlure.entity.Product;
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
@Table(name = "tbl_Model_3d")
public class Model3d {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "modelId")
    private Long modelId;

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "productId", referencedColumnName = "modelId")
    private Product product;

    private String name;
    private String url;

    @OrderBy("materialId ASC")
    @OneToMany(mappedBy = "model3d", cascade = CascadeType.ALL)
    // MapopedBy trỏ tới tên biến users ở trong Customize .
    //1 User có nhiều Customize
    private Collection<DefaultMaterial> materials;

    @JsonIgnore
    @OneToMany(mappedBy = "model3d")
    // MapopedBy trỏ tới tên biến users ở trong Customize .
    //1 User có nhiều Customize
    private Collection<CustomizeModel> customizeModels;
}
