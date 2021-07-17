package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoInp.AdminModel3dDtoInput;
import fpt.custome.yourlure.dto.dtoInp.CustomModelDtoInput;
import fpt.custome.yourlure.dto.dtoInp.Model3dDtoInput;
import fpt.custome.yourlure.dto.dtoOut.CustomModelDtoOut;
import fpt.custome.yourlure.entity.customizemodel.CustomizeModel;
import fpt.custome.yourlure.entity.customizemodel.Model3d;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Collection;

public interface CustomizeModelService {

    Model3d createModel3d(Model3dDtoInput m3d) throws IOException;

    @Transactional
    Boolean updateModel3d(AdminModel3dDtoInput adminModel3dDtoInput);

    Boolean deleteModel3d(Long modelId);

    Model3d getModelByProductId(Long productId);

    Model3d getModelByModelId(Long modelId);

    CustomModelDtoOut getCustomModelById(HttpServletRequest rq, Long customModelId);

    CustomModelDtoOut createCustomizeModel(HttpServletRequest rq, CustomModelDtoInput customModelDtoInput) throws IOException;

    @Transactional
    CustomModelDtoOut updateCustomizeModel(HttpServletRequest rq, CustomModelDtoInput customModelDtoInput) throws Exception;

    Boolean deleteCustomizeModel(HttpServletRequest rq, Long customizeModelId);

    Collection<CustomizeModel> findAllCustomizeModelByUser(HttpServletRequest rq);


}
