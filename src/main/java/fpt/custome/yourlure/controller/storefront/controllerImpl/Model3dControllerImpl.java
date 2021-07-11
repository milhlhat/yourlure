package fpt.custome.yourlure.controller.storefront.controllerImpl;

import fpt.custome.yourlure.controller.storefront.Model3dController;
import fpt.custome.yourlure.dto.dtoInp.CustomModelDtoInput;
import fpt.custome.yourlure.dto.dtoInp.Model3dDtoInput;
import fpt.custome.yourlure.dto.dtoOut.CustomModelDtoOut;
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
        try{
            return new ResponseEntity<>(customizeModelService.createModel3d(model3d), HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<CustomModelDtoOut> findCustomModel(HttpServletRequest rq, Long customId) {
        CustomModelDtoOut customizeModel = customizeModelService.getCustomModelById(rq, customId);
        if(customizeModel==null){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(customizeModel, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<CustomModelDtoOut> createCustomModel(HttpServletRequest rq, CustomModelDtoInput customModelDtoInput) {
        try{
            CustomModelDtoOut customizeModel = customizeModelService.createCustomizeModel(rq, customModelDtoInput);
            return new ResponseEntity<>(customizeModel, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<CustomModelDtoOut> updateCustomModel(HttpServletRequest rq, CustomModelDtoInput customModelDtoInput) {
        try{
            return new ResponseEntity<>(customizeModelService.updateCustomizeModel(rq, customModelDtoInput), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
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

    @Override
    public ResponseEntity<Object> getAllCustomizes(HttpServletRequest rq) {
        return new ResponseEntity<>(customizeModelService.findAllCustomizeModelByUser(rq), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Object> deleteCustomize(HttpServletRequest rq, Long customizeId) {
        return new ResponseEntity<>(customizeModelService.deleteCustomizeModel(rq, customizeId), HttpStatus.OK);
    }
}
