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
@Table(name = "tbl_DefaultMaterial")
public class DefaultMaterial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "defaultMaterialId")
    private Long materialId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "modelId", nullable = false)
    private Model3d model3d;

    private String defaultName;
    private String vnName;
    private Boolean canAddImg;
    private Boolean canAddColor;
    private Boolean canAddText;

    private String text;
    private String textFont;
    private String textColor;
    private Integer textSize;
    private String color;
    private String img;


    @OneToMany(mappedBy = "material", cascade = CascadeType.ALL, orphanRemoval = true)
    // MapopedBy trỏ tới tên biến users ở trong Customize .
    //1 User có nhiều Customize
    private Collection<Texture> textures;

    @JsonIgnore
    @OneToMany(mappedBy = "defaultMaterial", cascade = CascadeType.ALL)
    private Collection<CustomMaterial> customMaterials;

    /**
     * add product to fish
     *
     * @param p
     */
    public void addTexture(Texture p) {
        this.textures.add(p);
        p.setMaterial(this);
    }

    /**
     * remove product on fish
     *
     * @param p
     */
    public void removeTexture(Texture p) {
        this.textures.remove(p);
        p.setMaterial(this);
    }
}
