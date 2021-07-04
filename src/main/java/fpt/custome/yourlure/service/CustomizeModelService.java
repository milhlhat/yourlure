package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoInp.CustomModelDtoInput;
import fpt.custome.yourlure.dto.dtoInp.Model3dDtoInput;
import fpt.custome.yourlure.dto.dtoOut.CustomModelDtoOut;
import fpt.custome.yourlure.entity.customizemodel.CustomPrice;
import fpt.custome.yourlure.entity.customizemodel.CustomizeModel;
import fpt.custome.yourlure.entity.customizemodel.Model3d;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Collection;
import java.util.List;

public interface CustomizeModelService {

    Model3d createModel3d(Model3dDtoInput m3d) throws IOException;

    Model3d getModelByProductId(Long productId);

    Model3d getModelByModelId(Long modelId);

    CustomModelDtoOut getCustomModelById(HttpServletRequest rq, Long customModelId);

    CustomModelDtoOut createCustomizeModel(HttpServletRequest rq, CustomModelDtoInput customModelDtoInput) throws IOException;

    CustomModelDtoOut updateCustomizeModel(HttpServletRequest rq, CustomModelDtoInput customModelDtoInput) throws Exception;

    Boolean deleteCustomizeModel(HttpServletRequest rq, Long customizeModelId);

    Collection<CustomizeModel> findAllCustomizeModelByUser(HttpServletRequest rq);


}
