package fpt.custome.yourlure.dto.dtoInp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomizeInput {

    private Long customizeID;
    private String headColor;
    private String bodyColor;
    private String eyeColor;
    private String tailColor;
    private String backColor;
    private String hookColor;
    private String textureImg;

}
