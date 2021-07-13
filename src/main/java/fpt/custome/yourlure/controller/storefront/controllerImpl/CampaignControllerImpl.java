package fpt.custome.yourlure.controller.storefront.controllerImpl;

import fpt.custome.yourlure.controller.storefront.CampaignController;
import fpt.custome.yourlure.dto.dtoOut.CampaignDtoOut;
import fpt.custome.yourlure.service.CampaignService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class CampaignControllerImpl implements CampaignController {

    @Autowired
    CampaignService campaignService;

    @Override
    public ResponseEntity<List<CampaignDtoOut>> getAll() {
        List<CampaignDtoOut> dtoOuts = campaignService.getAll();
        return new ResponseEntity<>(dtoOuts, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Optional<CampaignDtoOut>> getById(Long id) {
        Optional<CampaignDtoOut> dtoOut = campaignService.getById(id);
        return new ResponseEntity<>(dtoOut, HttpStatus.OK);
    }

}
