package fpt.custome.yourlure.dto.dtoInp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdminModel3dDtoInput {

    private Long modelId;
    private List<AdminModel3dDtoInput.MaterialDtoInput1> materialDtoInputs;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MaterialDtoInput1 {

        private Long materialId;
        private String vnName;
        private Boolean canAddImg;
        private Boolean canAddColor;
        private Boolean canAddText;

        private List<String> linkTextures;
        private List<Long> listIdTexturesRemove;
    }

}
