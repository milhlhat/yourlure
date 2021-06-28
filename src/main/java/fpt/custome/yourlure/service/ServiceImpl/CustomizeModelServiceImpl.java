package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.CustomModelDto;
import fpt.custome.yourlure.entity.User;
import fpt.custome.yourlure.entity.customizemodel.*;
import fpt.custome.yourlure.repositories.*;
import fpt.custome.yourlure.security.JwtTokenProvider;
import fpt.custome.yourlure.service.CustomizeModelService;
import fpt.custome.yourlure.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class CustomizeModelServiceImpl implements CustomizeModelService {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private CustomizeModelRepos customizeModelRepos;

    @Autowired
    private CustomTypeRepos customTypeRepos;

    @Autowired
    private Model3dRepos model3dRepos;

    @Autowired
    private MaterialRepos materialRepos;

    @Autowired
    private MaterialValueRepos materialValueRepos;

    @Autowired
    private UserRepos userRepos;

    @Autowired
    private FileService fileService;


    @Override
    public Model3d createModel3d() {
        return null;
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

        // save customize material values

        for(CustomModelDto.MaterialValueDto materialValueDto : customModelDto.getMaterialValueDtoList()){
            Optional<Material> material = materialRepos.findById(materialValueDto.getMaterialId());
            Optional<CustomType> customType = customTypeRepos.findById(materialValueDto.getCustomizeTypeId());
            if(material.isPresent()){
                MaterialValue materialValue = MaterialValue.builder()
                        .customizeModel(customizeModel)
                        .material(material.get())
                        .customType(customType.get())
                        .value(materialValueDto.getValue())
                        .build();
                materialValue = materialValueRepos.save(materialValue);

                // add return value to customize model to return to client
                customizeModel.getMaterialValues().add(materialValue);
            }

        }

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
    public List<CustomType> findAllCustomType() {
        return null;
    }
}
