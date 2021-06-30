package fpt.custome.yourlure.dto.dtoInp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomModelDto {

    private String name;
    private Long model3dId;
    private List<MaterialDto> materials;
    private Thumbnail thumbnail;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Thumbnail{
        private String name;
        private byte[] content;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MaterialDto {
        private Long materialId;
        private String text;
        private String color;
        private String img;
    }
}
