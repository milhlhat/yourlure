package fpt.custome.yourlure.controller.admin.impl;

import fpt.custome.yourlure.controller.admin.AdminVariantController;
import fpt.custome.yourlure.dto.dtoInp.VariantDtoInput;
import fpt.custome.yourlure.entity.Variant;
import fpt.custome.yourlure.service.VariantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class AdminVariantControllerImpl implements AdminVariantController {

    @Autowired
    private VariantService variantService;

    @Override
    public ResponseEntity<Boolean> save(VariantDtoInput variantDtoInput) {
        Boolean result = variantService.save(variantDtoInput);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> update(VariantDtoInput variantDtoInput, Long id) {
        Boolean result = variantService.update(variantDtoInput,id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> delete(Long id) {
        Boolean result = variantService.remove(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Optional<Variant>> getById(Long id) {
        Optional<Variant> result = variantService.getById(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
