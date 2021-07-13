package fpt.custome.yourlure.controller.admin;

import fpt.custome.yourlure.dto.dtoInp.AdminCampaignDtoInput;
import fpt.custome.yourlure.dto.dtoInp.AdminFilterDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminCampaignDtoOut;
import fpt.custome.yourlure.dto.dtoOut.CampaignDtoOut;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RequestMapping(path = "/admin/campaign")
public interface AdminCampaignController {

    @PostMapping("/admin-all")
    ResponseEntity<Optional<AdminCampaignDtoOut>> adminGetAll(@RequestBody AdminFilterDtoInput adminFilterDtoInput);

    @GetMapping("/{id}")
    ResponseEntity<Optional<CampaignDtoOut>> getById(@PathVariable Long id);

    @PostMapping("/update")
    ResponseEntity<Optional<Boolean>> update(@RequestParam Long id, @RequestBody AdminCampaignDtoInput adminCampaignDtoInput);

    @PostMapping("/save")
    ResponseEntity<Optional<Boolean>> save(@RequestBody AdminCampaignDtoInput adminCampaignDtoInput);

    @DeleteMapping("/delete")
    ResponseEntity<Optional<Boolean>> delete(@RequestParam Long id);

}
