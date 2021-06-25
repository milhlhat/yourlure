package fpt.custome.yourlure.dto.dtoInp;

import fpt.custome.yourlure.entity.customizemodel.Material;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class CustomModelDto {

    private Long userId;
    private List<Material> materials;
    private MultipartFile imgThumbnail;
}
