package fpt.custome.yourlure.dto.dtoInp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Model3dDtoInput {

    private Long productId;
    private String name;
    private String model3dUrl;
    private Collection<DefaultMaterialDtoInput> defaultMaterials;


    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class DefaultMaterialDtoInput{
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

        private List<TextureDtoInput> textures;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TextureDtoInput{
        private String format;
        private String contentBase64;
        private Boolean isDefault;
    }

}
