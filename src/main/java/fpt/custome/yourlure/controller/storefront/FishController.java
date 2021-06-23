package fpt.custome.yourlure.controller.storefront;

import fpt.custome.yourlure.dto.dtoOut.FishDtoOut;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;


@RequestMapping(path = "/api/fish")
public interface FishController {

    @GetMapping("/all")
    ResponseEntity<List<FishDtoOut>> getAll();

}
