package fpt.custome.yourlure.controller.admin;

import fpt.custome.yourlure.dto.dtoInp.FishDtoInput;
import fpt.custome.yourlure.dto.dtoOut.AdminFishDtoOut;
import fpt.custome.yourlure.dto.dtoOut.FishDtoOut;
import fpt.custome.yourlure.entity.Filter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RequestMapping("/admin/fish")
public interface AdminFishController {

    @PostMapping(value = "/searchAll")
    ResponseEntity<Optional<AdminFishDtoOut>> searchAll(@RequestBody Filter filter);

    @GetMapping(value = "/getById")
    ResponseEntity<Optional<FishDtoOut>> getbyId(@RequestParam Long id);

    @PostMapping(value = "/save")
    ResponseEntity<Boolean> addFish(@RequestBody FishDtoInput fishDtoInput);

    @PostMapping(value = "/update")
    ResponseEntity<Boolean> update(@RequestBody FishDtoInput fishDtoInput, Long id);

    @DeleteMapping(value = "/delete/{id}")
    ResponseEntity<Boolean> deleteFish(@PathVariable Long id);

}