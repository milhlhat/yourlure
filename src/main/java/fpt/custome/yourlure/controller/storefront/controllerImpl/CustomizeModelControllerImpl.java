package fpt.custome.yourlure.controller.storefront.controllerImpl;

import fpt.custome.yourlure.controller.storefront.CustomizeModelController;
import fpt.custome.yourlure.dto.dtoInp.CustomModelDto;
import fpt.custome.yourlure.entity.customizemodel.CustomizeModel;
import fpt.custome.yourlure.service.CustomizeModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class CustomizeModelControllerImpl implements CustomizeModelController {

    @Autowired
    private CustomizeModelService customizeModelService;

    @Override
    public ResponseEntity<CustomizeModel> createModel(HttpServletRequest rq, CustomModelDto customModelDto) {
        try{
            CustomizeModel customizeModel = customizeModelService.createCustomizeModel(rq, customModelDto);
            return new ResponseEntity<>(customizeModel, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
