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
@Table(name = "tbl_CustomMaterial")
public class CustomMaterial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "materialId")
    private Long materialId;


    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "customizeId")
    private CustomizeModel customizeModel;

    private String defaultName;
    private String vnName;

    private String text;
    private String color;
    private String img;


}
