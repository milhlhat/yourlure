package fpt.custome.yourlure.controller.storefront;

import fpt.custome.yourlure.dto.dtoInp.CampaignRegisterDtoInput;
import fpt.custome.yourlure.dto.dtoOut.CampaignDtoOut;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RequestMapping(path = "/api/campaign")
public interface CampaignController {

    @GetMapping("/all")
    ResponseEntity<Object> getAll();

    @GetMapping("/newest")
    ResponseEntity<Object> newest();

    @GetMapping("/{id}")
    ResponseEntity<Object> getById(@PathVariable Long id);

    @PostMapping("/campaign-register")
    ResponseEntity<Object> registerCampaign(@RequestBody CampaignRegisterDtoInput campaignRegisterDtoInput);
}
