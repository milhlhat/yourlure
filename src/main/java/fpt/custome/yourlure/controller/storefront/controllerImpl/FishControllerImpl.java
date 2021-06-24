package fpt.custome.yourlure.controller.storefront.controllerImpl;

import fpt.custome.yourlure.controller.storefront.FishController;
import fpt.custome.yourlure.dto.dtoOut.FishDtoOut;
import fpt.custome.yourlure.service.FishService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class FishControllerImpl implements FishController {

    @Autowired
    FishService fishService;

    @Override
    public ResponseEntity<List<FishDtoOut>> getAll() {
        List<FishDtoOut> dtoOuts = fishService.getAll();
        return new ResponseEntity<>(dtoOuts, HttpStatus.OK);
    }
}
