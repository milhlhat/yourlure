package fpt.custome.yourlure.controller.admin.impl;

import fpt.custome.yourlure.controller.admin.AdminVariantController;
import fpt.custome.yourlure.dto.dtoInp.VariantDtoInput;
import fpt.custome.yourlure.service.VariantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.ValidationException;

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
    public ResponseEntity<Object> getById(Long id) {
        try{
            return new ResponseEntity<>(variantService.getById(id), HttpStatus.OK);
        }catch (ValidationException e){
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("Lỗi hệ thống!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
