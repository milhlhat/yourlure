package fpt.custome.yourlure.controller.storefront;

import fpt.custome.yourlure.dto.dtoOut.CampaignDtoOut;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RequestMapping(path = "/api/campaign")
public interface CampaignController {

    @GetMapping("/all")
    ResponseEntity<List<CampaignDtoOut>> getAll();

    @GetMapping("/{id}")
    ResponseEntity<Optional<CampaignDtoOut>> getById(@PathVariable Long id);

}
