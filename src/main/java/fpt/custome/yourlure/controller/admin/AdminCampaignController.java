package fpt.custome.yourlure.controller.admin;

import fpt.custome.yourlure.dto.dtoInp.AdminCampaignDtoInput;
import fpt.custome.yourlure.dto.dtoInp.AdminFilterDtoInput;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RequestMapping(path = "/admin/campaign")
public interface AdminCampaignController {

    @PostMapping("/admin-all")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Object> adminGetAll(@RequestBody AdminFilterDtoInput adminFilterDtoInput);

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Object> getById(@PathVariable Long id);

    @PostMapping("/update")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Object> update(@RequestParam Long id, @RequestBody AdminCampaignDtoInput adminCampaignDtoInput);

    @PostMapping("/save")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Object> save(@RequestBody AdminCampaignDtoInput adminCampaignDtoInput);

    @DeleteMapping("/delete")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Object> delete(@RequestParam Long id);

}
