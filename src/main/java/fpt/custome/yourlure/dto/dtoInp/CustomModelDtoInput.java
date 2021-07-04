package fpt.custome.yourlure.dto.dtoInp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomModelDtoInput {

    private Long customizeId;
    private String name;
    private Long model3dId;
    private List<MaterialDtoInput> materials;
    private Thumbnail thumbnail;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Thumbnail{
        private String name;
        private String content;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MaterialDtoInput {
        private Long materialId;
        private Long defaultMaterialId;
        private String text;
        private String textFont;
        private String textColor;
        private Integer textSize;
        private String color;
        private String img;
    }
}
