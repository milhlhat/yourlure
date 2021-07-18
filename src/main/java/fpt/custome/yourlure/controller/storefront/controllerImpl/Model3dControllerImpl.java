package fpt.custome.yourlure.controller.storefront.controllerImpl;

import fpt.custome.yourlure.controller.storefront.Model3dController;
import fpt.custome.yourlure.dto.dtoInp.AdminModel3dDtoInput;
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
import javax.validation.ValidationException;
import java.io.IOException;
import java.util.Optional;

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
    public ResponseEntity<Object> createModel(Model3dDtoInput model3d) {
        try {
            return new ResponseEntity<>(customizeModelService.createModel3d(model3d), HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Tạo model thất bại!", HttpStatus.OK);
        }
    }

    @Override
    public ResponseEntity<Object> update(AdminModel3dDtoInput adminModel3dDtoInput) {
        return new ResponseEntity<>(customizeModelService.updateModel3d(adminModel3dDtoInput), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Object> deleteModel(Long modelId) {
        return new ResponseEntity<>(customizeModelService.deleteModel3d(modelId), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Object> findCustomModel(HttpServletRequest rq, Long customId) {
        try {
            CustomModelDtoOut customizeModel = customizeModelService.getCustomModelById(rq, customId);
            if (customizeModel == null) {
                return new ResponseEntity<>("Không tìm thấy model 3d!", HttpStatus.OK);
            }
            return new ResponseEntity<>(customizeModel, HttpStatus.OK);
        } catch (ValidationException validationException) {
            System.out.println(validationException.getMessage());
            return new ResponseEntity<>(validationException.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Lỗi hệ thống!", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<Object> createCustomModel(HttpServletRequest rq, CustomModelDtoInput customModelDtoInput) {
        try {
            CustomModelDtoOut customizeModel = customizeModelService.createCustomizeModel(rq, customModelDtoInput);
            return new ResponseEntity<>(customizeModel, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Tạo tuỳ biến thất bại", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<Object> updateCustomModel(HttpServletRequest rq, CustomModelDtoInput customModelDtoInput) {
        try {
            return new ResponseEntity<>(customizeModelService.updateCustomizeModel(rq, customModelDtoInput), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Cập nhật thất bại", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<Object> getModelByProductId(Long productId) {
        Model3d m3d = customizeModelService.getModelByProductId(productId);
        if (m3d != null) {
            return new ResponseEntity<>(m3d, HttpStatus.OK);
        }
        return new ResponseEntity<>(Optional.empty(), HttpStatus.OK);
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
