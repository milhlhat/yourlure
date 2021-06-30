package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoInp.VariantDtoInput;

public interface VariantService {
    Boolean save(VariantDtoInput variantDtoInput);

    Boolean update(VariantDtoInput variantDtoInput, Long variantId);

    Boolean remove(Long id);

}
