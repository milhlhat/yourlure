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
@Table(name = "tbl_MaterialValue")
public class MaterialValue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "materialValueId")
    private Long materialValueId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "materialId", nullable = false)
    private Material material;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "customizeId", nullable = false)
    private CustomizeModel customizeModel;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "customTypeId", nullable = false)
    private CustomType customType;

    private String value;


}
