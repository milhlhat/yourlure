package fpt.custome.yourlure.controller.storefront;

import fpt.custome.yourlure.dto.dtoInp.AdminCampaignDtoInput;
import fpt.custome.yourlure.dto.dtoInp.AdminFilterDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminCampaignDtoOut;
import fpt.custome.yourlure.dto.dtoOut.CampaignDtoOut;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RequestMapping(path = "/api/campaign")
public interface CampaignController {

    @GetMapping("/all")
    ResponseEntity<List<CampaignDtoOut>> getAll();

    @PostMapping("/admin-all")
    ResponseEntity<Optional<AdminCampaignDtoOut>> adminGetAll(AdminFilterDtoInput adminFilterDtoInput);

    @GetMapping("/{id}")
    ResponseEntity<Optional<CampaignDtoOut>> getById(@PathVariable Long id);

    @PostMapping("/update/{id}")
    ResponseEntity<Optional<Boolean>> update(@RequestParam Long id, @RequestBody AdminCampaignDtoInput adminCampaignDtoInput);

    @PostMapping("/save/{id}")
    ResponseEntity<Optional<Boolean>> save(@RequestBody AdminCampaignDtoInput adminCampaignDtoInput);

}
