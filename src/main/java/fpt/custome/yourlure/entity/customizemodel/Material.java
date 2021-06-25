package fpt.custome.yourlure.entity.customizemodel;


import com.fasterxml.jackson.annotation.JsonIgnore;
import fpt.custome.yourlure.entity.Product;
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
@Table(name = "tbl_Material")
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "materialId")
    private Long materialId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "customizeId", nullable = false)
    private CustomizeModel customizeModel;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "productId", nullable = false)
    private Product product;

    private String name;
    private Boolean canAddImg;
    private Boolean canAddColor;
    private Boolean canAddText;


}
