package fpt.custome.yourlure.controller.storefront.controllerImpl;

import fpt.custome.yourlure.controller.storefront.CampainController;
import fpt.custome.yourlure.dto.dtoOut.CampaignDtoOut;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class CampainControllerImpl implements CampainController {


    @Override
    public ResponseEntity<List<CampaignDtoOut>> getAll() {
        return null;
    }

    @Override
    public ResponseEntity<Optional<CampaignDtoOut>> getById(Long id) {
        return null;
    }
}
