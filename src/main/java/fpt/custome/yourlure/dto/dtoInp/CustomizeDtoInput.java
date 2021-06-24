package fpt.custome.yourlure.dto.dtoInp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomizeDtoInput {

    private Long customizeId;
    private String headColor;
    private String bodyColor;
    private String tailColor;
    private String backColor;
    private String hookColor;
    private String textureImg;
    private Float price;
    private Long userId;
    private Long productId;

}
