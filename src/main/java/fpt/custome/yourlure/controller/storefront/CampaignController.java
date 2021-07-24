package fpt.custome.yourlure.controller.storefront;

import fpt.custome.yourlure.dto.dtoOut.CampaignDtoOut;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

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
}
