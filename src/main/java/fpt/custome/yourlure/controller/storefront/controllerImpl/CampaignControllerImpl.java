package fpt.custome.yourlure.controller.storefront.controllerImpl;

import fpt.custome.yourlure.controller.storefront.CampaignController;
import fpt.custome.yourlure.dto.dtoInp.CampaignRegisterDtoInput;
import fpt.custome.yourlure.dto.dtoOut.CampaignDtoOut;
import fpt.custome.yourlure.entity.Campaign;
import fpt.custome.yourlure.service.CampaignService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.ValidationException;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class CampaignControllerImpl implements CampaignController {

    @Autowired
    CampaignService campaignService;

    @Override
    public ResponseEntity<Object> getAll() {
        List<CampaignDtoOut> dtoOuts = campaignService.getAll();
        return new ResponseEntity<>(dtoOuts, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Object> newest() {
        try {
            Optional<CampaignDtoOut> campaign = campaignService.newest();
            return campaign.<ResponseEntity<Object>>map(campaignDtoOut -> new ResponseEntity<>(campaignDtoOut, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(Optional.empty(), HttpStatus.OK));

        } catch (ValidationException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Lỗi hệ thống", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Override
    public ResponseEntity<Object> getById(Long id) {
        Optional<CampaignDtoOut> dtoOut = campaignService.getById(id);
        return new ResponseEntity<>(dtoOut, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Object> registerCampaign(CampaignRegisterDtoInput campaignRegisterDtoInput) {
        try {
            Object dtoOut = campaignService.registerCampaign(campaignRegisterDtoInput);
            return new ResponseEntity<>(Optional.of(dtoOut), HttpStatus.OK);
        } catch (ValidationException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Lỗi hệ thống!", HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
