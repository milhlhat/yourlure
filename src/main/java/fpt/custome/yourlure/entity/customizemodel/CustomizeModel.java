package fpt.custome.yourlure.entity.customizemodel;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fpt.custome.yourlure.entity.User;
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
@Table(name = "tbl_Customize")
public class CustomizeModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customizeId")
    private Long customizeId;

    private String name;

    private String thumbnailUrl;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "modelId", nullable = false)
    private Model3d model3d;

    @JsonIgnore
    @OrderBy("materialId asc")
    @OneToMany(mappedBy = "customizeModel")
    private Collection<CustomMaterial> customMaterials;


}
