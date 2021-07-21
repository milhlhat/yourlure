package fpt.custome.yourlure.entity.customizemodel;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "tbl_Texture")
public class Texture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "textureId")
    private Long textureId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "defaultMaterialId")
    private DefaultMaterial material;

    private String textureUrl;
    private Boolean isDefault;


}