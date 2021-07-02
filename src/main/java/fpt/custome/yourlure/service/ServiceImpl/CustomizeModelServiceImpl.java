package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.CustomModelDto;
import fpt.custome.yourlure.dto.dtoInp.Model3dDtoInput;
import fpt.custome.yourlure.entity.Product;
import fpt.custome.yourlure.entity.User;
import fpt.custome.yourlure.entity.customizemodel.*;
import fpt.custome.yourlure.repositories.*;
import fpt.custome.yourlure.security.JwtTokenProvider;
import fpt.custome.yourlure.service.CustomizeModelService;
import fpt.custome.yourlure.service.FileService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
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
    private FileService fileService;

    @Autowired
    private ModelMapper mapper;


    @Override
    public Model3d createModel3d(Model3dDtoInput m3dIn) {
        Product product = productJpaRepos.findById(m3dIn.getProductId()).orElse(null);
        Model3d m3d = Model3d.builder()
                .product(product)
                .name(m3dIn.getName())
                .url(m3dIn.getUrl())
                .defaultMaterials(new ArrayList<>())
                .build();
        m3d = model3dRepos.save(m3d);

        for (DefaultMaterial defaultMaterial : m3dIn.getDefaultMaterials()) {
            defaultMaterial.setModel3d(m3d);
            defaultMaterial = defaultMaterialRepos.save(defaultMaterial);

            for (Texture texture : defaultMaterial.getTextures()) {
                texture.setMaterial(defaultMaterial);
                texture = textureRepos.save(texture);

            }
            m3d.getDefaultMaterials().add(defaultMaterial);

        }
        return m3d;
    }

    @Override
    public Model3d getModelByProductId(Long productId) {
        Optional<Model3d> model3d = model3dRepos.findByProductProductId(productId);
        return model3d.orElse(null);
    }

    @Override
    public Model3d getModelByModelId(Long modelId) {
        Optional<Model3d> model3d = model3dRepos.findById(modelId);
        return model3d.orElse(null);
    }

    @Override
    public CustomizeModel createCustomizeModel(HttpServletRequest rq, CustomModelDto customModelDto) throws IOException {

        // store thumbnail img
        String thumbnailUrl = fileService.saveFileByte(customModelDto.getThumbnail().getName(), customModelDto.getThumbnail().getContent());

        User user = userRepos.findByPhone(jwtTokenProvider.getUsername(jwtTokenProvider.resolveToken(rq)));
        Optional<Model3d> m3d = model3dRepos.findById(customModelDto.getModel3dId());

        // save customize model
        CustomizeModel customizeModel = CustomizeModel.builder()
                .name(customModelDto.getName())
                .model3d(m3d.get())
                .user(user)
                .thumbnailUrl(thumbnailUrl)
                .build();
        customizeModel = customizeModelRepos.save(customizeModel);


        List<CustomMaterial> materials = new ArrayList<>();
        for (CustomModelDto.MaterialDto materialDto : customModelDto.getMaterials()){
            CustomMaterial mat = mapper.map(materialDto, CustomMaterial.class);
            mat.setCustomizeModel(customizeModel);

            mat = customMaterialRepos.save(mat);
            materials.add(mat);
        }
        customizeModel.setCustomMaterials(materials);

        return customizeModel;
    }

    @Override
    public CustomizeModel updateCustomizeModel(HttpServletRequest rq, CustomizeModel customizeModel) {
        return null;
    }

    @Override
    public Boolean deleteCustomizeModel(HttpServletRequest rq, Long customizeModelId) {
        return null;
    }

    @Override
    public List<Model3d> findAllCustomizeModelByUser(HttpServletRequest rq) {
        return null;
    }


    @Override
    public List<CustomPrice> findAllCustomPrice() {
        return null;
    }
}
