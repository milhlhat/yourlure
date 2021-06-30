package fpt.custome.yourlure.controller.admin;

import fpt.custome.yourlure.dto.dtoInp.VariantDtoInput;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/admin/variant")
public interface AdminVariantController {

    @PostMapping("/save")
    ResponseEntity<Boolean> save(@RequestBody VariantDtoInput variantDtoInput);

    @PostMapping("/update")
    ResponseEntity<Boolean> update(@RequestBody VariantDtoInput variantDtoInput, @RequestParam Long id);

    @DeleteMapping("/{id}")
    ResponseEntity<Boolean> delete(@PathVariable("id") Long id);


}
