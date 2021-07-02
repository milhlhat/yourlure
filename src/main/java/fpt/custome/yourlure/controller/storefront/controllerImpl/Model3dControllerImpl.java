package fpt.custome.yourlure.controller.storefront.controllerImpl;

import fpt.custome.yourlure.controller.storefront.Model3dController;
import fpt.custome.yourlure.dto.dtoInp.CustomModelDto;
import fpt.custome.yourlure.dto.dtoInp.Model3dDtoInput;
import fpt.custome.yourlure.entity.customizemodel.CustomizeModel;
import fpt.custome.yourlure.entity.customizemodel.Model3d;
import fpt.custome.yourlure.repositories.Model3dRepos;
import fpt.custome.yourlure.service.CustomizeModelService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class Model3dControllerImpl implements Model3dController {

    @Autowired
    private CustomizeModelService customizeModelService;

    @Autowired
    private Model3dRepos model3dRepos;
    @Autowired
    private ModelMapper mapper;

    @Override
    public ResponseEntity<Model3d> createModel(Model3dDtoInput model3d) {
        return new ResponseEntity<>(customizeModelService.createModel3d(model3d), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<CustomizeModel> createCustomModel(HttpServletRequest rq, CustomModelDto customModelDto) {
        try{
            CustomizeModel customizeModel = customizeModelService.createCustomizeModel(rq, customModelDto);
            return new ResponseEntity<>(customizeModel, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<CustomizeModel> updateCustomModel(HttpServletRequest rq, CustomModelDto customModelDto) {
        return null;
    }

    @Override
    public ResponseEntity<Model3d> getModelByProductId(Long productId) {
        Model3d m3d = customizeModelService.getModelByProductId(productId);

        return new ResponseEntity<>(m3d, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Model3d> getModelByModelId(Long modelId) {
        return new ResponseEntity<>(customizeModelService.getModelByModelId(modelId), HttpStatus.OK);
    }
}
