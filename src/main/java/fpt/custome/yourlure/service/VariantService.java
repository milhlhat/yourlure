package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoInp.VariantDtoInput;
import fpt.custome.yourlure.entity.Variant;

import java.util.Optional;

public interface VariantService {
    Boolean save(VariantDtoInput variantDtoInput);

    Boolean update(VariantDtoInput variantDtoInput, Long variantId);

    Boolean remove(Long id);

    Optional<Variant> getById(Long id);

}
