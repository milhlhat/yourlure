package fpt.custome.yourlure.dto.dtoOut;

import fpt.custome.yourlure.entity.customizemodel.CustomMaterial;
import fpt.custome.yourlure.entity.customizemodel.CustomizeModel;
import fpt.custome.yourlure.entity.customizemodel.Texture;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CustomModelDtoOut {
    private Long customizeId;
    private String name;
    private String thumbnailUrl;
    private String modelUrl;

    private Collection<MaterialDtoOut> materials;

    public CustomModelDtoOut(CustomizeModel customizeModel){
        List<MaterialDtoOut> materialDtoOuts = new ArrayList<>();

        // convert custom material to material dto
        for (CustomMaterial material : customizeModel.getCustomMaterials()) {
           materialDtoOuts.add(new MaterialDtoOut(material));
        }
        this.customizeId = customizeModel.getCustomizeId();
        this.name = customizeModel.getName();
        this.thumbnailUrl = customizeModel.getThumbnailUrl();
        this.modelUrl = customizeModel.getModel3d().getUrl();
        this.materials = materialDtoOuts;


    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MaterialDtoOut {
        private Long materialId;
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
        private String imgUrl;

        private Collection<Texture> textures;

        public MaterialDtoOut(CustomMaterial material){
            this.materialId = material.getMaterialId();
            this.defaultName = material.getDefaultMaterial().getDefaultName();
            this.vnName = material.getDefaultMaterial().getVnName();
            this.canAddImg = material.getDefaultMaterial().getCanAddImg();
            this.canAddColor = material.getDefaultMaterial().getCanAddColor();
            this.canAddText = material.getDefaultMaterial().getCanAddText();
            this.text = material.getText();
            this.textFont = material.getTextFont();
            this.textColor = material.getTextColor();
            this.textSize = material.getTextSize();
            this.color = material.getColor();
            this.imgUrl = material.getImgUrl();
            this.textures = material.getDefaultMaterial().getTextures();
        }
    }


}
