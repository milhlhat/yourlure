package fpt.custome.yourlure.dto.dtoInp;

import fpt.custome.yourlure.entity.customizemodel.DefaultMaterial;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Model3dDtoInput {

    private Long productId;
    private String name;
    private String url;
    private Collection<DefaultMaterial> defaultMaterials;
}
