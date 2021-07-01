package fpt.custome.yourlure.dto.dtoOut;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Model3dDtoOut {
    private Long modelId;
    private String name;
    private String url;

    private Collection<MaterialDto> materials;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MaterialDto{
        private String name;
        private Boolean canAddImg;
        private Boolean canAddColor;
        private Boolean canAddText;

        private String text;
        private String color;
        private String imgUrl;
    }


}
