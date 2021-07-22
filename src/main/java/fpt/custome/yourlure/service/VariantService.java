package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoInp.VariantDtoInput;
import fpt.custome.yourlure.entity.Variant;

public interface VariantService {
    Object save(VariantDtoInput variantDtoInput);

    Object update(VariantDtoInput variantDtoInput, Long variantId);

    Object remove(Long variantId,Long productId);

    Variant getById(Long id);

}
