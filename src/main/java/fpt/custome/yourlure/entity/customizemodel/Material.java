package fpt.custome.yourlure.entity.customizemodel;


import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "tbl_Material")
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "materialId")
    private Long materialId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "modelId", nullable = false)
    private Model3d model3d;

    @OneToMany(mappedBy = "material", cascade = CascadeType.ALL)
    // MapopedBy trỏ tới tên biến users ở trong Customize .
    //1 User có nhiều Customize
    private Collection<MaterialValue> materialValues;

    private String name;
    private Boolean canAddImg;
    private Boolean canAddColor;
    private Boolean canAddText;


}
