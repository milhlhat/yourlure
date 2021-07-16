package fpt.custome.yourlure.controller.admin;

import fpt.custome.yourlure.dto.dtoInp.SeasonDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminSeasonDtoOutput;
import fpt.custome.yourlure.dto.dtoOut.SeasonDtoOutput;
import fpt.custome.yourlure.entity.Filter;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RequestMapping(path = "/admin/season")
public interface AdminSeasonController {

    @PostMapping(value = "/searchAll")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Optional<AdminSeasonDtoOutput>> searchAll(@RequestBody @Valid Filter filter);

    @GetMapping(value = "/getById")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Optional<SeasonDtoOutput>> getById(@RequestParam Long id);

    @PostMapping(value = "/save")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Boolean> addFish(@RequestBody @Valid SeasonDtoInput seasonDtoInput);

    @PostMapping(value = "/update")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Boolean> update(@RequestBody @Valid SeasonDtoInput seasonDtoInput, Long id);

    @DeleteMapping(value = "/delete/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Boolean> deleteFish(@PathVariable Long id);

}
