package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.CustomModelDtoInput;
import fpt.custome.yourlure.dto.dtoInp.Model3dDtoInput;
import fpt.custome.yourlure.dto.dtoOut.CustomModelDtoOut;
import fpt.custome.yourlure.entity.Product;
import fpt.custome.yourlure.entity.User;
import fpt.custome.yourlure.entity.customizemodel.*;
import fpt.custome.yourlure.repositories.*;
import fpt.custome.yourlure.security.JwtTokenProvider;
import fpt.custome.yourlure.service.CustomizeModelService;
import fpt.custome.yourlure.service.FileService;
import fpt.custome.yourlure.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class CustomizeModelServiceImpl implements CustomizeModelService {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private CustomizeModelRepos customizeModelRepos;


    @Autowired
    private Model3dRepos model3dRepos;

    @Autowired
    private DefaultMaterialRepos defaultMaterialRepos;

    @Autowired
    private TextureRepos textureRepos;

    @Autowired
    private CustomMaterialRepos customMaterialRepos;

    @Autowired
    private ProductJpaRepos productJpaRepos;

    @Autowired
    private UserRepos userRepos;

    @Autowired
    private UserService userService;

    @Autowired
    private FileService fileService;

    @Autowired
    private ModelMapper mapper;


    @Override
    public Model3d createModel3d(Model3dDtoInput m3dIn) throws IOException {
        Product product = productJpaRepos.findById(m3dIn.getProductId()).orElse(null);
        // save model 3d file
        String model3dUrl = m3dIn.getUrl();

        if(fileService.isFileExist(model3dUrl)){
            throw new FileNotFoundException("the 3d model wasn't uploaded yet!");
        }

        Model3d m3d = Model3d.builder()
                .product(product)
                .name(m3dIn.getName())
                .url(model3dUrl)
//                .defaultMaterials(new ArrayList<>())
                .build();


        List<DefaultMaterial> materials = new ArrayList<>();
        for (Model3dDtoInput.DefaultMaterialDtoInput materialDtoInput : m3dIn.getDefaultMaterials()) {

            DefaultMaterial defaultMaterial = mapper.map(materialDtoInput, DefaultMaterial.class);

            List<Texture> textures = new ArrayList<>();
            int textureCount = 0;
            for (Model3dDtoInput.TextureDtoInput textureDto : materialDtoInput.getTextures()) {
                StringBuilder textureFileName = new StringBuilder()
                        .append(defaultMaterial.getDefaultName())
                        .append("_texture_")
                        .append(textureCount++)
                        .append(".")
                        .append(textureDto.getFormat());

                String url = fileService.saveFileBase64(textureFileName.toString(), textureDto.getContentBase64(), FileService.TEXTURE_DIR);
                if (textureDto.getIsDefault()) {
                    defaultMaterial.setImg(url);
                }
                Texture texture = Texture.builder()
                        .material(defaultMaterial)
                        .textureUrl(url)
                        .isDefault(textureDto.getIsDefault())
                        .build();
                textures.add(texture);


            }
            defaultMaterial.setTextures(textures);
            defaultMaterial.setModel3d(m3d);
            materials.add(defaultMaterial);

        }
        m3d.setMaterials(materials);
        m3d = model3dRepos.save(m3d);
        return m3d;
    }

    @Override
    public Model3d updateModel3d(Model3d m3d) {
        return model3dRepos.save(m3d);
    }

    @Override
    public Boolean deleteModel3d(Long modelId) {
        Model3d m3d = model3dRepos.getById(modelId);
        if(!m3d.getCustomizeModels().isEmpty()){
            return false;
        }
        model3dRepos.delete(m3d);
        return true;
    }

    @Override
    public Model3d getModelByProductId(Long productId) {
        List<Model3d> model3d = model3dRepos.findAllByProductProductId(productId);
        return model3d.get(model3d.size() - 1);
    }

    @Override
    public Model3d getModelByModelId(Long modelId) {
        Optional<Model3d> model3d = model3dRepos.findById(modelId);
        return model3d.orElse(null);
    }

    @Override
    public CustomModelDtoOut getCustomModelById(HttpServletRequest rq, Long customModelId) {
        User user = userService.whoami(rq);
        CustomizeModel customizeModel = customizeModelRepos.findAllByCustomizeIdAndUserUserIdIs(customModelId, user.getUserId());
        CustomModelDtoOut output = new CustomModelDtoOut(customizeModel);
        return output;
    }

    @Override
    public CustomModelDtoOut createCustomizeModel(HttpServletRequest rq, CustomModelDtoInput customModelDtoInput) throws IOException {

        // store thumbnail img
        String thumbnailUrl = fileService.saveFileBase64(customModelDtoInput.getThumbnail().getName(), customModelDtoInput.getThumbnail().getContent(), FileService.CUSTOMS_DIR);

        User user = userRepos.findByPhone(jwtTokenProvider.getUsername(jwtTokenProvider.resolveToken(rq)));
        Optional<Model3d> m3d = model3dRepos.findById(customModelDtoInput.getModel3dId());

        // init customize model
        CustomizeModel customizeModel = CustomizeModel.builder()
                .name(customModelDtoInput.getName())
                .model3d(m3d.get())
                .user(user)
                .thumbnailUrl(thumbnailUrl)
                .build();
        customizeModel = customizeModelRepos.save(customizeModel);

        // init custom material
        List<CustomMaterial> materials = new ArrayList<>();
        for (CustomModelDtoInput.MaterialDtoInput materialDtoInput : customModelDtoInput.getMaterials()) {
            CustomMaterial mat = mapper.map(materialDtoInput, CustomMaterial.class);
            mat.setCustomizeModel(customizeModel);
            mat.setDefaultMaterial(defaultMaterialRepos.getById(materialDtoInput.getMaterialId()));
//            mat = customMaterialRepos.save(mat);
            materials.add(mat);
        }
        customizeModel.setCustomMaterials(materials);
        customizeModel = customizeModelRepos.save(customizeModel);

        CustomModelDtoOut output = new CustomModelDtoOut(customizeModel);
        return output;
    }

    @Override
    public CustomModelDtoOut updateCustomizeModel(HttpServletRequest rq, CustomModelDtoInput customModelDtoInput) throws Exception {
        User user = userService.whoami(rq);
        boolean isModelBelongTo = false;
        for (CustomizeModel model : user.getCustomizeModels()) {
            if (model.getCustomizeId().equals(customModelDtoInput.getCustomizeId())) {
                isModelBelongTo = true;
            }
        }
        if (!isModelBelongTo) {
            throw new Exception("this model doesn't belong to current user!");
        }


        CustomizeModel customizeModel = customizeModelRepos.getById(customModelDtoInput.getCustomizeId());
        customizeModel.setName(customizeModel.getName());
        // TODO: delete old thumbnail
        fileService.deleteFile(customizeModel.getThumbnailUrl());
        // TODO: create new thumbnail
        String imgUrl = fileService.saveFileBase64(customModelDtoInput.getThumbnail().getName(), customModelDtoInput.getThumbnail().getContent(), FileService.CUSTOMS_DIR);
        customizeModel.setThumbnailUrl(imgUrl);

        // init custom material
        List<CustomMaterial> materials = new ArrayList<>();
        for (CustomModelDtoInput.MaterialDtoInput materialDtoInput : customModelDtoInput.getMaterials()) {
            CustomMaterial mat = customMaterialRepos.getById(materialDtoInput.getMaterialId());
            mat.setColor(materialDtoInput.getColor());
            mat.setImg(materialDtoInput.getImg());
            mat.setText(materialDtoInput.getText());
            mat.setTextColor(materialDtoInput.getTextColor());
            mat.setTextFont(materialDtoInput.getTextFont());
            mat.setTextSize(materialDtoInput.getTextSize());
            materials.add(mat);
        }
        customizeModel.setCustomMaterials(materials);
        customizeModel = customizeModelRepos.save(customizeModel);

        CustomModelDtoOut output = new CustomModelDtoOut(customizeModel);
        return output;
    }

    @Override
    public Boolean deleteCustomizeModel(HttpServletRequest rq, Long customizeModelId) {
        User user = userService.whoami(rq);
        for (CustomizeModel customizeModel : user.getCustomizeModels()) {
            if(customizeModel.getCustomizeId().equals(customizeModelId)){
                customizeModelRepos.delete(customizeModel);
                return true;
            }
        }
        return false;
    }

    @Override
    public Collection<CustomizeModel> findAllCustomizeModelByUser(HttpServletRequest rq) {
        return userService.whoami(rq).getCustomizeModels();
    }

}
